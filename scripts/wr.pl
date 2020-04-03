#!/usr/bin/perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use utf8;
use lib '../lib';
use EnglishRoom::Wordreference;


my $wr = Wordreference->new();

$wr->get_data;

sub lalala {
	print "hola";
}



    
    
