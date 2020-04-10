#!/usr/bin/env perl 

# package EnglishRoom::WordsGUI;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use lib '.';
use EnglishRoom::Config qw(UI_path);
use EnglishRoom::FrameBooksGUI qw(FrameBooks);

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
      BtnMenu
      RevMain
      StackMainMenu
      MainMenuPage1
      MainMenuPage2
      TglBook
      TglTranslate
      TglConjugations
      RoomsPage1
      RoomsPage2
      RoomBox
    );
}

###

# my $glade_file_path = UI_path;
my $WordsView = UI_path . "/MainWindow.glade";

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

sub BtnMenu {
    my $BtnMenu = $builder_main->get_object("BtnMenu")
      or die "Error: no se encuentra el widget BtnMenu";
    return $BtnMenu;
}

sub RevMain {
    my $RevMain = $builder_main->get_object("RevMain")
      or die "Error: no se encuentra el widget RevMain";
    return $RevMain;
}

sub StackMainMenu {
    my $StackMainMenu = $builder_main->get_object("StackMainMenu")
      or die "Error: no se encuentra el widget StackMainMenu";
    return $StackMainMenu;
}

sub MainMenuPage1 {
    my $MainMenuPage1 = $builder_main->get_object("MainMenuPage1")
      or die "Error: no se encuentra el widget MainMenuPage1";
    return $MainMenuPage1;
}

sub TglBook {
    my $TglBook = $builder_main->get_object("TglBook")
      or die "Error: no se encuentra el widget TglBook";
    return $TglBook;
}

sub TglTranslate {
    my $TglTranslate = $builder_main->get_object("TglTranslate")
      or die "Error: no se encuentra el widget TglTranslate";
    return $TglTranslate;
}

sub TglConjugations {
    my $TglConjugations = $builder_main->get_object("TglConjugations")
      or die "Error: no se encuentra el widget TglConjugations";
    return $TglConjugations;
}

sub MainMenuPage2 {
    my $MainMenuPage2 = $builder_main->get_object("MainMenuPage2")
      or die "Error: no se encuentra el widget MainMenuPage2";
    return $MainMenuPage2;
}

sub RoomsPage1 {
    my $RoomsPage1 = $builder_main->get_object("RoomsPage1")
      or die "Error: no se encuentra el widget RoomsPage1";
    return $RoomsPage1;
}

sub RoomsPage2 {
    my $RoomsPage2 = $builder_main->get_object("RoomsPage2")
      or die "Error: no se encuentra el widget RoomsPage2";
    $RoomsPage2->pack_start( FrameBooks, 1, 1, 0 );
    return $RoomsPage2;
}

sub StackRooms {
    my $StackRooms = $builder_main->get_object("StackRooms")
      or die "Error: no se encuentra el widget StackRooms";
    return $StackRooms;
}

sub RoomBox {
    my $RoomBox = $builder_main->get_object("RoomBox")
      or die "Error: no se encuentra el widget RoomBox";
    return $RoomBox;
}

StackRooms->set_visible_child( RoomsPage1() );

TglBook->signal_connect(
    'toggled',
    sub {
        return;
    }
);

TglTranslate->signal_connect(
    'toggled',
    sub {
        return;
    }
);

TglConjugations->signal_connect(
    'toggled',
    sub {
        return;
    }
);

1;
