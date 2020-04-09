package EnglishRoom::WordsGUI;
###
use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;

BEGIN {
    require Exporter;
    our $VERSION = '0.0';
    our @ISA     = qw(Exporter);
    our @EXPORT  = qw();
}

# my $glade_file_path = '/home/hugo/.atom/github/englishroom/data/UI/';
# my $glade_file      = "$glade_file_path/WebView.glade";
# my $WebViewGladeUI  = "$glade_file";
#
# # starting Builder
# my $builder_main = Gtk3::Builder->new();
# $builder_main->add_from_file("$WebViewGladeUI")
#   or die "Error: no se encuentra el asrchivo $WebViewGladeUI";

# getting widgets
# my $window = $builder_main->get_object("WebViewWindow")
#   or die "Error: no se encuentra el widget WebViewWindow";
#
# # Setting widgets poperties
#
# $window->show_all;
# Gtk3::main;

1;
