#!/usr/bin/env perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use utf8;
use lib ".";

my $glade_file     = "";
my $WebViewGladeUI = "$glade_file";

