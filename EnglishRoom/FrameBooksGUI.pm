#!/usr/bin/env perl 

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);

use Web::Query qw();
use Time::HiRes qw(usleep nanosleep);
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use Gtk3::WebKit2;
use File::Find qw(find);
use lib '../';
use lib '.';

use EnglishRoom::Config qw(
  EnglishRoomUI
  UserFiles
  BooksPath
  BooksURI
  BooksPath
  EnglishRoomLibs
);
use EnglishRoom::Functions qw(
  get_categories
  PDF2HTML
  );

BEGIN {
    require Exporter;
    our $VERSION = '0.0';
    our @ISA     = qw(Exporter);
    our @EXPORT  = qw(
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
      BooksListStore
    );
}

###
my $BooksListStore;

# my $glade_file_path = UI_path;
my $BooksView = EnglishRoomUI . "/FrameBooks.glade";
my $BooksURI  = BooksURI();
my $BooksPath = BooksPath();
my @my_books;
my $n = '0';

say $BooksURI;
say $BooksPath;

sub update_frame_book_list {
my ( $path, $books, $cfg, $cats, $bdb ) = UserFiles;
open (BDB, "<", "$bdb") or die "Error: $!\n";

while  (my $l=<BDB>)
  {
    chomp $l;
    say $l;
    my ($id, $title, $age, $cat, $index) = split("::", $l);
    push @my_books,
      {
        'title' => $title,
        'path'  => $books . "$title/",
        'index' => $index,
        'uri'   => 'file://' . $books . "$title/" . $index
      };
  }

use Data::Dumper;
say Dumper @my_books;
return;
}

&update_frame_book_list;

# starting Builder
my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$BooksView")
  or die "Error: no se encuentra el archivo BooksView";

# getting widgets
sub FrameBooks {
    my $FrameBooks = $builder_main->get_object("FrameBooks")
      or die "Error: no se encuentra el widget FrameBooks";
    return $FrameBooks;
}

sub BookViewer {
    my $AlignViewerBooks = $builder_main->get_object("AlignViewerBooks")
      or die "Error: no se encuentra el widget AlignViewerBooks";
    my $v      = EnglishRoom::BookViewerGUI->new( 'opt01' => 'hola mundo' );
    my $viewer = $v->get_viewer;
    $viewer->load_uri($BooksURI);
    say $viewer;
    $AlignViewerBooks->add($viewer);
    return $AlignViewerBooks;
}

sub MenuBooks {
    my $MenuBooks = $builder_main->get_object("MenuBooks")
      or die "Error: no se encuentra el widget MenuBooks";
    return $MenuBooks;
}

sub BookMenuFileOpen {
    my $BookMenuFileOpen = $builder_main->get_object("BookMenuFileOpen")
      or die "Error: no se encuentra el widget BookMenuFileOpen";
    return $BookMenuFileOpen;
}

sub BookMenuFileClose {
    my $BookMenuFileClose = $builder_main->get_object("BookMenuFileClose")
      or die "Error: no se encuentra el widget BookMenuFileClose";
    return $BookMenuFileClose;
}

sub BooksMenuShowList {
    my $BooksMenuShowList = $builder_main->get_object("BooksMenuShowList")
      or die "Error: no se encuentra el widget BooksMenuShowList";
    return $BooksMenuShowList;
}

sub BooksMenuHelpAbout {
    my $BooksMenuHelpAbout = $builder_main->get_object("BooksMenuHelpAbout")
      or die "Error: no se encuentra el widget BooksMenuHelpAbout";
    return $BooksMenuHelpAbout;
}

sub RevealerBookList {
    my $RevealerBookList = $builder_main->get_object("RevealerBookList")
      or die "Error: no se encuentra el widget RevealerBookList";
    return $RevealerBookList;
}

sub StackBookList {
    my $StackBookList = $builder_main->get_object("StackBookList")
      or die "Error: no se encuentra el widget StackBookList";
    return $StackBookList;
}

sub TWBooks {
    my $TWBooks = $builder_main->get_object("TWBooks")
      or die "Error: no se encuentra el widget TWBooks";
    return $TWBooks;
}

sub TWColumnBooks {
    my $TWColumnBooks = $builder_main->get_object("TWColumnBooks")
      or die "Error: no se encuentra el widget TWColumnBooks";
    return $TWColumnBooks;
}

sub TWCellBooks {
    my $TWCellBooks = $builder_main->get_object("TWCellBooks")
      or die "Error: no se encuentra el widget TWCellBooks";
    return $TWCellBooks;
}

sub BookTabLabel_book {
    my $BookTabLabel_book = $builder_main->get_object("BookTabLabel_book")
      or die "Error: no se encuentra el widget BookTabLabel_book";
    return $BookTabLabel_book;
}

sub BookTabLabel_translations {
    my $BookTabLabel_translations =
      $builder_main->get_object("BookTabLabel_translations")
      or die "Error: no se encuentra el widget BookTabLabel_translations";
    return $BookTabLabel_translations;
}

sub NoteBookBooks {
    my $NoteBookBooks = $builder_main->get_object("NoteBookBooks")
      or die "Error: no se encuentra el widget NoteBookBooks";
    return $NoteBookBooks;
}

sub BookTabLabel_notes {
    my $BookTabLabel_notes = $builder_main->get_object("BookTabLabel_notes")
      or die "Error: no se encuentra el widget BookTabLabel_notes";
    return $BookTabLabel_notes;
}

sub BookTabLabel_exercises {
    my $BookTabLabel_exercises =
      $builder_main->get_object("BookTabLabel_exercises")
      or die "Error: no se encuentra el widget BookTabLabel_exercises";
    return $BookTabLabel_exercises;
}

sub BooksViewerSettings {
    my $BooksViewerSettings = $builder_main->get_object("BooksViewerSettings")
      or die "Error: no se encuentra el widget BooksViewerSettings";
    return $BooksViewerSettings;
}

sub BooksListStore {

    # my ( $title, $file ) = @_;
    $BooksListStore = $builder_main->get_object("BooksListStore")
      or die "Error: no se encuentra el widget BooksListStore";

#    my ( $path, undef, $cfg, $db, $cats ) = UserFiles;
    my ( $path, $books, $cfg, $cats, $bdb ) = UserFiles;

    #say "Formando lista de libros $path $bdb $cfg";

    open( FILEHANDLER, "<", $bdb )
      or die "Error $bdb: $!";
    while ( my $l = <FILEHANDLER> ) {
        my ( $id, $title, $age, $cat, $uri ) = split( "::", $l );
        my $iter = $BooksListStore->append();
        $BooksListStore->set(
            $iter,
            0 => "$title",
            1 => "$uri",

            # 2 => 'index'
        );
    }
    close FILEHANDLER;

    return $BooksListStore;
}

BookMenuFileOpen->signal_connect(
    'activate' => sub {
        system('echo 0 > /tmp/status');
        FrameBooks->set_sensitive('0');
        MenuBooks->set_sensitive('0');
        say EnglishRoomLibs . "/AddBookAssistantGUI.pm";
         system( "perl " . EnglishRoomLibs . "/BookAssistantGUI.pm&" );
        for ( 1 .. 100000000000 ) {
            my $l = 0;

            Gtk3::main_iteration while Gtk3::events_pending;

            open( FILEHANDLER, "<", '/tmp/status' ) or die "Error /tmp/status: $!";
            while ( $l = <FILEHANDLER> ) {
                chomp $l;
                if ( $l ne 1 ) {
                    say $l;
                    next;
                }
                else {
                    say $l;
                    $BooksListStore->clear;
                    &BooksListStore;
                    FrameBooks->set_sensitive('1');
                    MenuBooks->set_sensitive('1');
                    return;
                }
            }
            close FILEHANDLER;

            usleep(100000);

            Gtk3::main_iteration while Gtk3::events_pending;
        }

    }
);


1;
