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

my $glade_file_path = '/home/hugo/.atom/github/englishroom/data/UI/';
my $glade_file      = "$glade_file_path/WebView.glade";
my $WebViewGladeUI  = "$glade_file";

# starting Builder
my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$WebViewGladeUI")
  or die "Error: no se encuentra el asrchivo $WebViewGladeUI";

# getting widgets
my $window = $builder_main->get_object("WebViewWindow")
  or die "Error: no se encuentra el widget WebViewWindow";
my $tgl_book = $builder_main->get_object("TglBook")
  or die "Error: no se encuentra el widget TglBook";
my $main_stack = $builder_main->get_object("MainStack")
  or die "Error: no se encuentra el widget MainStack";
my $box_book = $builder_main->get_object("BoxBook")
  or die "Error: no se encuentra el widget BoxBook";
my $web_align = $builder_main->get_object("AlignWebView")
  or die "Error: no se encuentra el widget WebAlign";
my $entry_search = $builder_main->get_object("EntrySearch")
  or die "Error: no se encuentra el widget EntrySearch";
my $verbs_button = $builder_main->get_object("MenuVerbsButton")
  or die "Error: no se encuentra el widget VerbsButton";
my $revealer = $builder_main->get_object('revealer')
  or die "Error: no se encuentra el widget revealer";
my $stack_menu = $builder_main->get_object('StackMenu')
  or die "Error: no se encuentra el widget StackMenu";
my $menu_page1 = $builder_main->get_object('menu_page1')
  or die "Error: no se encuentra el widget menu_page1";
my $menu_page2 = $builder_main->get_object('menu_page2')
  or die "Error: no se encuentra el widget menu_page2";

# my $button_menu_local = $builder_main->get_object('button_menu_local')
#   or die "Error: no se encuentra el widget button_menu_local";
my $find_buttom = $builder_main->get_object("find_VerbsButton")
  or die "Error: no se encuentra el widget VerbsButton";

# my $find_revealer = $builder_main->get_object('find_revealer')
#   or die "Error: no se encuentra el widget find_revealer";
my $find_stack_menu = $builder_main->get_object('find_stack_menu')
  or die "Error: no se encuentra el widget find_stack_menu";
my $find_menu_page1 = $builder_main->get_object('find_menu_page1')
  or die "Error: no se encuentra el widget find_menu_page1";
my $find_menu_page2 = $builder_main->get_object('find_menu_page2')
  or die "Error: no se encuentra el widget find_menu_page2";

# Setting widgets poperties

$window->show_all;
Gtk3::main;

1;
