#!/usr/bin/perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Gtk3::WebKit2;
use Glib qw(TRUE FALSE);
use utf8;
use lib '/home/hugo/.atom/github/englishroom/';

# use EnglishRoom::Linguee;
# use EnglishRoom::Config;
use EnglishRoom::MainWindowGUI;

my $MainWindow = MainWindow();

$MainWindow->show_all;
Gtk3::main;
