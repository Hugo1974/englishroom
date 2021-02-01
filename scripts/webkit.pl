#!/usr/bin/perl
use strict;
use warnings;
use Gtk3 -init;
use Gtk3::WebKit2;
use Glib qw(TRUE FALSE);
use utf8;
use Encode;

# by zentara.... a free Perl adaptation of WebKit's GtkLauncher
my $clippy =
  Gtk3::Clipboard::get( Gtk3::Gdk::Atom::intern( 'PRIMARY', FALSE ) );
$clippy->wait_for_text();

my $win = Gtk3::Window->new;
$win->set_default_size( 800, 600 );
$win->signal_connect( destroy => sub { Gtk3->main_quit } );

#globals
my (
    $toolbarbox, $viewbox,       $statusbox,
    $entry,      $view,          $statusbar,
    $title,      $load_progress, $status_context_id
);

$title = 'Gtk3 Webkit Perl Browser';
$win->set_title($title);

my $vbox = Gtk3::VBox->new( FALSE, 2 );
$vbox->set_border_width(2);
$win->add($vbox);
$vbox->set_border_width(2);

foreach my $box ( $toolbarbox, $viewbox, $statusbox ) {
    $box = Gtk3::VBox->new( FALSE, 0 );
    $box->set_border_width(0);
    if ( ($viewbox) && ( $box eq $viewbox ) ) {
        $vbox->pack_start( $box, 1, 1, 1 );
    }
    else {
        $vbox->pack_start( $box, 0, 0, 1 );
    }
}

create_toolbar($toolbarbox);
create_browser($viewbox);
create_status($statusbox);

$win->show_all;
$view->grab_focus;

#if you want to open a default file or uri
#$view->open( $ARGV[0] || 'file://z.html' );
#$view->open( $ARGV[0] || 'http://perlmonks.org' );

#$view->load_uri('http://localhost/phpmyadmin/');
$view->load_uri( 'file:///home/hugo/.atom/github/englishroom/tmp/conj_es.html'
      || 'http://localhost' );

Gtk3->main;

sub create_toolbar {
    my $box     = $_[0];
    my $toolbar = Gtk3::Toolbar->new;
    $toolbar->set_icon_size('large-toolbar');
    $toolbar->set_show_arrow(FALSE);
    $toolbar->set_orientation('GTK_ORIENTATION_HORIZONTAL');

    #make the toolbar buttons, etc
    my $button = Gtk3::ToolButton->new_from_stock('gtk-go-back');
    $button->signal_connect( "clicked" => \&go_back, undef );
    $toolbar->insert( $button,                      -1 );
    $toolbar->insert( Gtk3::SeparatorToolItem->new, -1 );

    $button = Gtk3::ToolButton->new_from_stock('gtk-go-forward');
    $button->signal_connect( "clicked" => \&go_forward, undef );
    $toolbar->insert( $button,                      -1 );
    $toolbar->insert( Gtk3::SeparatorToolItem->new, -1 );

    # make entry for URI's
    my $entbox = Gtk3::ToolItem->new();
    $entbox->set_expand(1);
    $entry = Gtk3::Entry->new();
    $entbox->add($entry);
    $entry->signal_connect( "activate" => \&activate_uri_entry, undef );
    $toolbar->insert( $entbox, -1 );

    $button = Gtk3::ToolButton->new_from_stock('gtk-ok');
    $button->signal_connect( "clicked" => \&activate_uri_entry, undef );
    $toolbar->insert( $button, -1 );

    $button = Gtk3::ToolButton->new( undef, 'Screenshot' );
    $button->signal_connect( "clicked" => \&screenshot, undef );
    $toolbar->insert( $button, -1 );

    $box->pack_start( $toolbar, FALSE, FALSE, 0 );
}

sub create_browser {
    my $box = $_[0];

    my $sw = Gtk3::ScrolledWindow->new;
    $sw->set_policy( 'automatic', 'automatic' );

#         $sw->set_size_request (500, 500); # hack to set initial empty browser size

    $view = Gtk3::WebKit2::WebView->new;

    $view->signal_connect( 'context-menu', \&append_item );

    # add item
    sub append_item {
        use Data::Dumper;
        print Dumper @_;
        my ( $webview, $context_menu, $hit_result_event, $event ) = @_;

        $context_menu->remove_all();

        my $menu_action_translate = Gtk3::Action->new(
            "Traducir",                    "_Traducir",
            "Traducir texto seleccionado", 'gtk-find'
        );
        $menu_action_translate->signal_connect(
            "activate",
            sub {
                print "Traducir:\n";
                my $text = $clippy->wait_for_text;
                return unless ($text);
                print("\t>>> $text");
                $webview->load_uri(
"https://www.wordreference.com/es/translation.asp?tranword=$text"
                );
            }
        );

        my $option =
          Gtk3::WebKit2::ContextMenuItem->new($menu_action_translate);
        $context_menu->append($option);

        my $option_back = Gtk3::WebKit2::ContextMenuItem->new_from_stock_action(
            'WEBKIT_CONTEXT_MENU_ACTION_GO_BACK');
        $context_menu->append($option_back);

        my $option_forward =
          Gtk3::WebKit2::ContextMenuItem->new_from_stock_action(
            'WEBKIT_CONTEXT_MENU_ACTION_GO_FORWARD');
        $context_menu->append($option_forward);

        my $option_copy = Gtk3::WebKit2::ContextMenuItem->new_from_stock_action(
            'WEBKIT_CONTEXT_MENU_ACTION_COPY');
        $context_menu->append($option_copy);
    }

#         $view->signal_connect( 'notify::title' => \&notify_title, undef );
#         $view->signal_connect( 'notify::load-status' => \&notify_load_status, undef );
#         $view->signal_connect( 'notify::progress' => \&notify_progress, undef );
    $view->signal_connect(
        'mouse-target-changed' => \&hovering_over_link,
        undef
    );

    $sw->add($view);
    $box->pack_start( $sw, 1, 1, 0 );
}

sub create_status {
    my $box = $_[0];
    $statusbar         = Gtk3::Statusbar->new;
    $status_context_id = $statusbar->get_context_id('Link Hover');
    $box->pack_start( $statusbar, FALSE, FALSE, 0 );
}

sub go_back { $view->go_back }

sub go_forward { $view->go_forward }

sub activate_uri_entry {
    my $uri = $entry->get_text;
    $uri ||= 'http://google.com';
    $view->load_uri($uri);
}

sub hovering_over_link {
    use Data::Dumper;
    my ( $hash, $na, $link ) = @_;

    if ( ( defined $link ) && ( $na->get_link_uri ) ) {
        $statusbar->pop($status_context_id);
        $statusbar->push( $status_context_id, $na->get_link_uri );
    }
    else {
        $statusbar->pop($status_context_id);
    }
}
