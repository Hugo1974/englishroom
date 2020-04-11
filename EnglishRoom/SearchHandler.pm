package EnglishRoom::SearchHandler;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';
use File::Find;
use EnglishRoom::Config qw(html_english_words_path);
use EnglishRoom::Linguee;

BEGIN {
    require Exporter;

    our $VERSION = '0.0';

    our @ISA = qw(Exporter);

    our @EXPORT = qw(
      linguee
      linguasorb
    );
}

sub new {

    my $clase = shift;
    my $self  = {@_};

    $self->{opt01} ||= '';
    $self->{opt02} ||= '';
    $self->{opt03} ||= '';
    $self->{opt04} ||= '';
    $self->{opt05} ||= '';

    return bless $self, $clase;

}

# Functions
sub linguee {
    my $word = lc shift;
    say "WORD: " . html_english_words_path . "$word";
    my $file = html_english_words_path() . $word;
    my $lg = EnglishRoom::Linguee->new( 'query' => "$word" );

    if ( -f $file ) {
        say "Se ha encontrado el archivo file://$file ";
        $lg->{query}     = $word;
        $lg->{localfile} = $file;
        return $lg->get();
    }
    else {
        say "No se ha encontrado file://$file";
        $lg->{query} = "$word";
        return $lg->get();
    }
}

sub linguasorb {

    #...
}

# Getters
sub get_01 {
    my $self = shift;

    #...
}

sub get_02 {
    my $self = shift;

    #...
}

# Setters
sub set_01 {
    my $self = shift;

    #...
}

sub set_02 {
    my $self = shift;

    #...
}

1;
