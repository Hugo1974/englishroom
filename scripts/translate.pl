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
use EnglishRoom::Linguee;

my $WebViewGladeUI =
  '/home/hugo/.atom/github/englishroom/data/UI/WebView.glade';
my $BooksViewGladeUI =
  '/home/hugo/.atom/github/englishroom/data/UI/FrameBooks.glade';

my $clippy =
  Gtk3::Clipboard::get( Gtk3::Gdk::Atom::intern( 'PRIMARY', FALSE ) );
$clippy->wait_for_text();

my $traductor = EnglishRoom::Linguee->new();

$traductor->source('english');

# $traductor->get( $traductor->query('home') );

my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$WebViewGladeUI")
  or die "Error: no se encuentra el asrchivo";
my $builder_frame_books = Gtk3::Builder->new();
$builder_frame_books->add_from_file("$BooksViewGladeUI")
  or die "Error: no se encuentra el asrchivo $BooksViewGladeUI";

$builder_main->connect_signals(undef);
$builder_frame_books->connect_signals(undef);

my $window = $builder_main->get_object("WebViewWindow")
  or die "Error: no se encuentra el widget WebViewWindow";
my $tgl_book = $builder_main->get_object("TglBook")
  or die "Error: no se encuentra el widget TglBook";
my $main_stack = $builder_main->get_object("MainStack")
  or die "Error: no se encuentra el widget MainStack";
my $box_book = $builder_main->get_object("BoxBook")
  or die "Error: no se encuentra el widget BoxBook";

my $revealer_book_list = $builder_frame_books->get_object("RevealerBookList")
  or die "Error: no se encuentra el widget RevealerBookList";
my $books_menu_lista = $builder_frame_books->get_object("BooksMenuVerID")
  or die "Error: no se encuentra el widget BooksMenuVerID";
$books_menu_lista->set_draw_as_radio(1);
$books_menu_lista->set_active(1);
$books_menu_lista->signal_connect(
    'toggled' => sub {
        say "active>> " . $books_menu_lista->get_active;

        if ( $books_menu_lista->get_active() ) {
            $revealer_book_list->set_reveal_child('1');
            $books_menu_lista->set_active('1');
            return;
        }
        else {
            $revealer_book_list->set_reveal_child('0');
            $books_menu_lista->set_active('0');
            return;
        }

    }
);

my $frame_books = $builder_frame_books->get_object("FrameBooks")
  or die "Error: no se encuentra el widget FrameBooks";

$box_book->pack_start( $frame_books, 1, 1, 0 );

my $web_align = $builder_main->get_object("AlignWebView")
  or die "Error: no se encuentra el widget WebAlign";

my $entry_search = $builder_main->get_object("EntrySearch")
  or die "Error: no se encuentra el widget EntrySearch";

my $verbs_button = $builder_main->get_object("MenuVerbsButton")
  or die "Error: no se encuentra el widget VerbsButton";
my $revealer          = $builder_main->get_object('revealer');
my $stack_menu        = $builder_main->get_object('StackMenu');
my $menu_page1        = $builder_main->get_object('menu_page1');
my $menu_page2        = $builder_main->get_object('menu_page2');
my $button_menu_local = $builder_main->get_object('button_menu_local');

my $find_buttom = $builder_main->get_object("find_VerbsButton")
  or die "Error: no se encuentra el widget VerbsButton";
my $find_revealer   = $builder_main->get_object('find_revealer');
my $find_stack_menu = $builder_main->get_object('find_stack_menu');
my $find_menu_page1 = $builder_main->get_object('find_menu_page1');
my $find_menu_page2 = $builder_main->get_object('find_menu_page2');

$window->signal_connect( destroy => sub { Gtk3->main_quit() } );

$tgl_book->signal_connect(
    'toggled' => sub {
        $main_stack->set_visible_child($box_book);
        $stack_menu->set_visible_child($menu_page1);
        $window->show_all;
        return;
    }
);

my $view = Gtk3::WebKit2::WebView->new();

my $scrolls = Gtk3::ScrolledWindow->new();
$scrolls->add($view);
$web_align->add($scrolls);

$view->load_uri( $traductor->get_formated_file_uri );

$entry_search->signal_connect(
    'activate',
    sub {
        $traductor->get( $traductor->query( $entry_search->get_text ) );
        say "Buscar" . $entry_search->get_text;
        say "FF> " . $traductor->get_formated_file_uri;
        if ( -f $traductor->get_formated_file ) {
            $view->load_uri( $traductor->get_formated_file_uri );
        }
        else { die "Error abriendo " . $traductor->get_formated_file_uri }
        return;
    }
);

$clippy->signal_connect(
    "owner-change",
    sub {
        my $text = $clippy->wait_for_text;
        print "Traducir:\n";
        say("\t>>> $text");
        $find_stack_menu->set_visible_child($find_menu_page2);
        $entry_search->set_text($text);
        return unless ($text);
    }
);

$verbs_button->signal_connect(
    "clicked",
    sub {
        &reveal_child( 'menu', \$revealer, \$stack_menu, \$menu_page1,
            \$menu_page2 );
    }
);
$find_buttom->signal_connect(
    "clicked",
    sub {
        &reveal_child(
            'find',            \$find_revealer,
            \$find_stack_menu, \$find_menu_page1,
            \$find_menu_page2
        );
    }
);

$web_align->show_all;

$window->show_all;
Gtk3::main;

sub reveal_child {

    my $button     = $_[0];
    my $revealer   = $_[1];
    my $stack_menu = $_[2];
    my $menu_page1 = $_[3];
    my $menu_page2 = $_[4];

    if ( ( $$stack_menu->get_visible_child ) eq $$menu_page2 ) {
        $$stack_menu->set_visible_child($$menu_page1);
    }
    else {
        $$stack_menu->set_visible_child($$menu_page2);
    }

    return;

}
