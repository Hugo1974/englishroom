package EnglishRoom::WordsGUI;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use utf8;
use Encode;
use open 'locale';

BEGIN {
    require Exporter;
    our $VERSION = '0.0';
    our @ISA     = qw(Exporter);
    our @EXPORT  = qw(
      MainWindow
      RevSearchEntry
      StackSearch
      find_menu_page1
      find_menu_page2
      EntrySearch
      BtnSearch
      BtnMenuVerbs
      RevMain
      StackMainMenu
      MainMenuPage1
      MainMenuPage2
      RoomsPage1
      RoomsPage2
      RoomBox
    );
}

my $glade_file_path = '/home/hugo/.atom/github/englishroom/data/UI/';
my $glade_file      = "$glade_file_path/MainWindow.glade";
my $WordsView       = "$glade_file";

# starting Builder
my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$WordsView")
  or die "Error: no se encuentra el asrchivo $WordsView";

# getting widgets
sub MainWindow {
    my $MainWindow = $builder_main->get_object("MainWindow")
      or die "Error: no se encuentra el widget MainWindow";
    return $MainWindow;
}

sub RevSearchEntry {
    my $RevSearchEntry = $builder_main->get_object("RevSearchEntry")
      or die "Error: no se encuentra el widget RevSearchEntry";
    return $RevSearchEntry;
}

sub StackSearch {
    my $StackSearch = $builder_main->get_object("StackSearch")
      or die "Error: no se encuentra el widget StackSearch";
    return $StackSearch;
}

sub find_menu_page1 {
    my $find_menu_page1 = $builder_main->get_object("find_menu_page1")
      or die "Error: no se encuentra el widget find_menu_page1";
    return $find_menu_page1;
}

sub find_menu_page2 {
    my $find_menu_page2 = $builder_main->get_object("find_menu_page2")
      or die "Error: no se encuentra el widget find_menu_page2";
    return $find_menu_page2;
}

sub EntrySearch {
    my $EntrySearch = $builder_main->get_object("EntrySearch")
      or die "Error: no se encuentra el widget EntrySearch";
    return $EntrySearch;
}

sub BtnSearch {
    my $BtnSearch = $builder_main->get_object("BtnSearch")
      or die "Error: no se encuentra el widget BtnSearch";
    return $BtnSearch;
}

sub BtnMenuVerbs {
    my $BtnMenuVerbs = $builder_main->get_object("BtnMenuVerbs")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $BtnMenuVerbs;
}

sub RevMain {
    my $RevMain = $builder_main->get_object("RevMain")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $RevMain;
}

sub StackMainMenu {
    my $StackMainMenu = $builder_main->get_object("StackMainMenu")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $StackMainMenu;
}

sub MainMenuPage1 {
    my $MainMenuPage1 = $builder_main->get_object("MainMenuPage1")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $MainMenuPage1;
}

sub MainMenuPage2 {
    my $MainMenuPage2 = $builder_main->get_object("MenuVerbsButton")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $MainMenuPage2;
}

sub RoomsPage1 {
    my $RoomsPage1 = $builder_main->get_object("RoomsPage1")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $RoomsPage1;
}

sub StackRooms {
    my $StackRooms = $builder_main->get_object("StackRooms")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $StackRooms;
}

sub RoomsPage2 {
    my $RoomsPage2 = $builder_main->get_object("StackRooms")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $RoomsPage2;
}

sub RoomBox {
    my $RoomBox = $builder_main->get_object("RoomBox")
      or die "Error: no se encuentra el widget MenuVerbsButton";
    return $RoomBox;
}

&MainWindow->show_all;
Gtk3::main;

1;
