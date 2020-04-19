#!/usr/bin/env perl 

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use lib '.';
use Gtk3::WebKit2;
use File::Find qw(find);
use EnglishRoom::Config qw(UI_path Books_path);
use EnglishRoom::BookViewerGUI;

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

# my $glade_file_path = UI_path;
my $BooksView = UI_path . "/FrameBooks.glade";
my $BooksPath = 'file://' . Books_path();
my @my_books;
my $n = '0';

for my $file ( glob Books_path . '/*' ) {
    say "\"$file\"";
    my ( $path, $dir ) = split( /html\//, $file );
    my $index = "$path" . 'html/' . "$dir/" . "$dir" . '.html';
    my $title = $dir;
    $title =~ s/_englishroom_book//;

    push @my_books,
      {
        'title' => $title,
        'path'  => $path . "html/" . $dir,
        'index' => $index
      };
    $n++;
}

use Data::Dumper;
say Dumper @my_books;

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
    my $v = EnglishRoom::BookViewerGUI->new( 'opt01' => 'hola mundo' );
    my $viewer = $v->get_viewer;
    $viewer->load_uri($BooksPath);
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
    my $BooksListStore = $builder_main->get_object("BooksListStore")
      or die "Error: no se encuentra el widget BooksListStore";
    for my $item (@my_books) {
        my $iter = $BooksListStore->append();
        $item->{title} =~ s/.*html\///;
        $BooksListStore->set(
            $iter,
            0 => $item->{title},
            1 => $item->{path},
            2 => $item->{index}

        );
    }
    return $BooksListStore;
}

BooksListStore();

1;
