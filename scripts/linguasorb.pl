#!/usr/bin/env perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';
use Mojo::DOM;
use Data::Dumper;
use constant 'DEBUG' => '1';

my $LIGUASORB = 'https://www.linguasorb.com';

# my $query = 'be';

my $response_html_file = do { local $/; open FILE, 'many_res.html'; <FILE> };
close FILE;

my $dom = Mojo::DOM->new($response_html_file);

for my $e (&get_active_class) {
    &get_links(&get_table) if ( $e->text =~ /Search Results/ );
}

sub get_links {
    my $dom = Mojo::DOM->new(shift);
    my @result_url;
    my @result_text;

    for my $l ( $dom->find('a') ) {
        push @result_url,  $l->map( sub { $_->attr('href') } )->each;
        push @result_text, $l->map( sub { $_->text } )->each;
    }

    if (DEBUG) {
        foreach my $i ( 0 .. scalar(@result_url) - 1 ) {
            say "# $result_text[$i]\n  --> " . $LIGUASORB . "$result_url[$i]";
        }
    }
}

sub get_active_class {
    return $dom->find('li[class=active]')->each;
}

sub get_table {
    $dom->find('table[class=table]')->join("\n");
}
