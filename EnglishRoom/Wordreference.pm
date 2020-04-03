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

package Wordreference;

# Dependencias
#
#   Mojo::DOM
#   Web::Query



use 5.006;
use strict;
use warnings;
use lib '/home/hugo/perl5/lib/perl5';
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Mojo::DOM;


our $VERSION = '0.01';

use constant WR_URL => ('https://www.wordreference.com');
use constant DEBUG => '0';
    
sub new {
        
        my $clase = shift;
        my $self = {@_};

        
        print Dumper $self if DEBUG;
        
        $self->{wr_search_url} =    WR_URL;
        $self->{linguee_get_url}    ||= '';
        $self->{query}              ||= '';
        $self->{translate_to}       ||= 'es';
        $self->{translate_from}     ||= 'es';
        $self->{source}             ||= 'english';
        $self->{localfile}          ||= '/tmp/wr_tree.pl';
        $self->{remotefile}         ||= './wr_res.html';
        
        my $search_string        = "/$self->{translate_to}/translation.asp?tranword=";

        
        
        $self->{get}                ||= '';
        
#         say "URL search>" . $self->{wr_search_url} . $search_string;

        return bless $self, $clase;
        
        }
        
        
    # Comporbar si la palabra es un verbo
    
    # si es un verbo, obtener la conjugación en inglés y español
    
    sub get_data {
    
        my $self = shift;
        
#         say "Accediedo a data";
        

        open (DATA, "<", './file.html') || "Error:$!";
        my $content;
            {
                local $/ = undef; # slurp mode
                $content = <DATA>;
            }
        close DATA;

        my $dom = Mojo::DOM->new( $content );

        my $module_list = $dom
            ->find('td[style="vertical-align:top;"]')
            ->join("\n");
            
        print "<html><head>";
        print '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">';
        print "<link href=\"main.css\" rel=\"stylesheet\" type=\"text/css\">";
        print "<link href=\"WRredesign.css\" rel=\"stylesheet\" type=\"text/css\">";
        print "</head><body><div><table>\n\n";
        print $module_list;
        print "\n\n</table></div></body></html>";
        
        }
    
    # devolver el resultado
    


# Hugo Morago Martín, C<< <nanti.penguin at gmail.com> >>


1; # End of Wordreference
