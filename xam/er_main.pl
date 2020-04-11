#!/usr/bin/env perl

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
use lib '../';
use EnglishRoom::MainWindowGUI qw(
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
  RoomsPage1
  RoomsPage2
  RoomBox
);

use EnglishRoom::FrameBooksGUI qw(
  FrameBooks
  MenuBooks
  BookMenuFileOpen
  BookMenuFileClose
  BooksMenuShowList
  BooksMenuHelpAbout
  RevealerBookList
  StackBookList
  TWBooks
  TWColumnBooks
  TWCellBooks
  NoteBookBooks
  BookViewer
  BookTabLabel_book
  BookTabLabel_translations
  BookTabLabel_notes
  BookTabLabel_exercises
  BooksViewerSettings
);

##
MainWindow->set_title('English Room 0.01');
MainWindow->signal_connect( destroy => sub { Gtk3->main_quit(); return; } );

# Show menú
BtnMenu->signal_connect(
    "clicked",
    sub {
        if ( ( StackMainMenu->get_visible_child ) eq MainMenuPage2() ) {
            StackMainMenu->set_visible_child( MainMenuPage1() );
        }
        else {
            StackMainMenu->set_visible_child( MainMenuPage2() );
        }
        return;
    }
);

TglBook->signal_connect(
    'clicked',
    sub {
        BookViewer;
        StackRooms->set_visible_child( RoomsPage2() );
        StackMainMenu->set_visible_child( MainMenuPage1() );
        MainWindow->show_all;
        return;
    }
);

MainWindow->show_all;
Gtk3::main;

__END__
