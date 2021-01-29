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

my $clippy =
  Gtk3::Clipboard::get( Gtk3::Gdk::Atom::intern( 'PRIMARY', FALSE ) );
$clippy->wait_for_text();

my $traductor = EnglishRoom::Linguee->new();

$traductor->source('english');

$traductor->get( $traductor->query('home') );

my $builder = Gtk3::Builder->new();
$builder->add_from_file("../data/UI/WebView.glade");
$builder->connect_signals(undef);
my $window    = $builder->get_object("WebViewWindow");
my $web_align = $builder->get_object("AlignWebView")
  or die "Error: no se encuentra el widget WebAlign";
my $entry_search = $builder->get_object("EntrySearch")
  or die "Error: no se encuentra el widget EntrySearch";

my $verbs_button = $builder->get_object("MenuVerbsButton")
  or die "Error: no se encuentra el widget VerbsButton";
my $revealer          = $builder->get_object('revealer');
my $stack_menu        = $builder->get_object('stack_menu');
my $menu_page1        = $builder->get_object('menu_page1');
my $menu_page2        = $builder->get_object('menu_page2');
my $button_menu_local = $builder->get_object('button_menu_local');

my $find_buttom = $builder->get_object("find_VerbsButton")
  or die "Error: no se encuentra el widget VerbsButton";
my $find_revealer   = $builder->get_object('find_revealer');
my $find_stack_menu = $builder->get_object('find_stack_menu');
my $find_menu_page1 = $builder->get_object('find_menu_page1');
my $find_menu_page2 = $builder->get_object('find_menu_page2');

$window->signal_connect( destroy => sub { Gtk3->main_quit() } );

my $view = Gtk3::WebKit2::WebView->new();

my $scrolls = Gtk3::ScrolledWindow->new();
$scrolls->add($view);
$web_align->add($scrolls);

$view->load_uri( $traductor->get_formated_file_uri );
$web_align->show_all();
$view->show_all();

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
