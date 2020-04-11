package EnglishRoom::BookViewerGUI;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use utf8;
use lib ".";
use EnglishRoom::Config();

# use EnglishRoom::FrameBooksGUI qw(BookViewer);

BEGIN {
    require Exporter;

    our $VERSION = '0.0';

    our @ISA = qw(Exporter);

    our @EXPORT = qw(
      func01
      func02
    );
}

sub new {
    my $clase = shift;
    my $self  = {@_};

    $self->{opt01} ||= '';
    $self->{opt02} ||= '';
    $self->{opt03} ||= '';
    $self->{opt04} ||= '';
    $self->{opt05} ||= '';
    $self->{viewer} = Gtk3::WebKit2::WebView->new();
    $self->{clippy} =
      Gtk3::Clipboard::get( Gtk3::Gdk::Atom::intern( 'PRIMARY', FALSE ) );

    $self->{viewer}->grab_focus;
    $self->{clippy}->wait_for_text();

    $self->{viewer}
      ->signal_connect( 'context-menu', \&append_item, $self->{clippy} );

    say $self->{opt01};
    return bless $self, $clase;

}

# Functions
sub append_item {
    say "@_";
    use Data::Dumper;
    say Dumper @_;
    my ( $webview, $context_menu, $hit_result_event, $event, $clippy ) = @_;

    $context_menu->remove_all();

    my $menu_action_translate = Gtk3::Action->new( "Traducir", "_Traducir",
        "Traducir texto seleccionado", 'gtk-find' );
    $menu_action_translate->signal_connect(
        "activate",
        sub {
            print "Traducir:\n";
            my $text = $clippy->wait_for_text;
            return unless ($clippy);
            print("\t>>> $text");
            $webview->load_uri(
"https://www.wordreference.com/es/translation.asp?tranword=$text"
            );
            return;
        }
    );

    my $option = Gtk3::WebKit2::ContextMenuItem->new($menu_action_translate);
    $context_menu->append($option);

    #...
}

sub func02 {

    #...
}

# Setters
sub set_01 {
    my $self = shift;

    #...
}

sub set_02 {
    my $self = shift;

    #...
}

# Getters
sub get_viewer {
    my $self = shift;
    return $self->{viewer};
}

sub get_02 {
    my $self = shift;

    #...
}

1;

