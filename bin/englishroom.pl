#!/usr/bin/perl

use strict;
use warnings;
use Cwd qw(getcwd);


chdir "/home/henar/.englishroom/englishroom/bin";


use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Gtk3::WebKit2;
use Glib qw(TRUE FALSE);
use utf8;
use lib $ENV{HOME} . "/.englishroom/englishroom/";


###

# use EnglishRoom::Linguee;
# use EnglishRoom::Config;
use EnglishRoom::MainWindowGUI;

my $MainWindow = MainWindow();

$MainWindow->show_all;
Gtk3::main;
