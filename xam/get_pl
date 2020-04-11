#!/usr/bin/env perl 

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';

#for i in `cat commons_english_word_list.txt`; do  torify wget -k  "https://www.linguee.es/espanol-ingles/search?source=ingles&query=$i" && sleep 1; done
#for i in  `seq 1 1000`; do echo -e "Reiniciando tor" && curl --socks5 127.0.0.1:9050 http://checkip.amazonaws.com/ && service tor restart && sleep 3; done

open( WORDS, "<", './commons_english_word_list.txt' )
  or die "Error: commons_english_word_list.txt no se ha encontrado ($!)";

my @words;

my $linguee =
  "https://www.linguee.es/espanol-ingles/search?source=ingles&query=";

while ( my $w = <WORDS> ) { chomp $w; push @words, "$w"; }

foreach ( my $i = 0 ; $i <= $#words - 1 ; $i++ ) {
    if ( $i % 10 == 0 ) {
        say `sudo service tor restart`;
        sleep 5;
        system 'curl --socks5 127.0.0.1:9050 http://checkip.amazonaws.com/';
    }
    say "\n\n$words[$i]> $linguee" . $words[$i] . "\n";
    system(
"torify wget -k  \"https://www.linguee.es/espanol-ingles/search?source=ingles&query=$words[$i]\""
    );
}

# system("torify wget -k ");

