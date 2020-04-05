#Copyright 2020 Hugo Morago Martín.
#
#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.
#
#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.
#
#You should have received a copy of the GNU General Public License
#along with this program.  If not, see L<http://www.gnu.org/licenses/>.

# TODO Archivo de configuración (indicar localización de js y css)

package EnglishRoom::Linguee;

####  DEPENDENCIAS ####
# LWP::Protocol::socks
# IO::Socket::Socks
# Web::Query

use 5.006;
use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use LWP::UserAgent;
use LWP::Protocol::socks;
use EnglishRoom::Config qw(
  agent
  proxy
  html_response_file
  html_formated_file
  html_formated_file
  css_uri
  js_uri
  pretty
);
use Data::Dumper;
binmode( STDOUT, "encoding(UTF-8)" );

our $VERSION = '0.01';

sub new {

    use constant 'LINGUEE_URL_SEARCH' =>
      ('https://www.linguee.com/english-spanish/search?');
    use constant 'DEBUG' => '1';

    my $clase = shift;
    my $self  = {@_};

    #    print Dumper $self if DEBUG;

    $self->{linguee} = LINGUEE_URL_SEARCH;
    $self->{query}             ||= 'hello';
    $self->{source}            ||= 'english';
    $self->{target}            ||= 'spanish';
    $self->{source}            ||= 'english';
    $self->{response_file}     ||= html_response_file();
    $self->{formated_file_uri} ||= html_formated_file_uri();
    $self->{formated_file}     ||= html_formated_file();
    $self->{agent}             ||= agent();
    $self->{proxy}             ||= proxy();
    $self->{css_uri}           ||= css_uri();
    $self->{js_uri}            ||= js_uri();
    $self->{pretty_exec}       ||= pretty();
    $self->{search_url} ||=
      $self->{linguee} . 'source=' . $self->{source} . '&query=';

    say "URL search>" . $self->{search_url} if DEBUG;

    return bless $self, $clase;

}

sub source {
    my $self = shift;
    $self->{source} = shift;

    say "SOURCE> " . $self->{source};

    return $self;
}

sub get_formated_file_uri {
    my $self = shift;
    say "Enviando " . $self->{formated_file_uri};
    return $self->{formated_file_uri};
}

sub get_formated_file {
    my $self = shift;
    return $self->{formated_file};
}

sub query {
    my $self = shift;
    $self->{query} = shift;

    say "QUERY> "
      . $self->{query}
      if DEBUG . "URL> "
      . $self->{search_url}
      . 'source='
      . $self->{source}
      . '&query='
      . $self->{query};

    return $self->{query};
}

sub get {
    my $self = shift;
    $self->{query} = shift;
    say "GETTING> " . $self->{search_url} . $self->{query};

    my $ua = new LWP::UserAgent( 'agent' => $self->{agent} );
    $ua->proxy( [qw(http https)] => $self->{proxy} );
    my $response = $ua->get( $self->{search_url} . $self->{query} );
    print $response->code, ' ', $response->message, "\n" if DEBUG;

    if ( $response->code eq '503' ) {
        die "Error: "
          . $response->code . " "
          . $response->message
          . "\nEl servidor está realizando tareas de mantenimiento\n";
    }

    elsif ( $response->code eq '404' ) {
        die "Error: "
          . $response->code . " "
          . $response->message
          . "\nNo se encuentra la URL proporcionada\n";
    }

    if ( $response->code ne '200' ) {
        die "Error: " . $response->code . " " . $response->message;
    }

    my $res_cont = $response->content;

    my $w    = Web::Query->new_from_html($res_cont);
    my $html = $w->find('#dictionary')->as_html;

    my $css_file           = $self->{css_uri};
    my $play_audio_js_file = $self->{js_uri};

    say "Abriendo el fichero " . $self->{response_file};
    open( FILE, ">", $self->{response_file} )
      or die "Error:" . $self->{response_file} . " ($!)\n";

    print FILE "<html>";
    print FILE "<head>";
    print FILE
      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
    print FILE '<link rel="stylesheet" type="text/css" href='
      . $css_file . ">\n";
    print FILE '<script type="text/javascript" src='
      . $play_audio_js_file
      . '></script>';
    print FILE "<body>";
    print FILE "$html";
    print FILE "</body>";
    print FILE "<html>";
    close FILE;

    say "Creando el fichero " . $self->{formated_file};
    my $pretty_html = `$self->{pretty_exec} -e UTF-8 $self->{response_file}`;

    open( OUTPUT_FILE, ">", $self->{formated_file} )
      or die "Error:" . $self->{formated_file} . " ($!)\n";
    print OUTPUT_FILE $pretty_html;
    close OUTPUT_FILE;

    return;

}

sub get_output_file {
    my $self = shift;
    return $self->{formated_file};
}

1;    # End of MyEnglish::LinGuee
