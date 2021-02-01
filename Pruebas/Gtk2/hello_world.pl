#!/usr/bin/perl
#
# Simple Hello World app; mostly for github front page
#

use strict;
use warnings;

use Gtk3 '-init';
use Glib 'TRUE', 'FALSE';
use Gtk3::Helper;
use FileHandle;

my $window = Gtk3::Window->new;
$window->set_title('Hello World!');
$window->set_default_size( 300, -1 );
$window->signal_connect( destroy => sub { Gtk3->main_quit } );

my $icon = 'gtk-logo-rgb.gif';
if ( -e $icon ) {
    my $pixbuf      = Gtk3::Gdk::Pixbuf->new_from_file($icon);
    my $transparent = $pixbuf->add_alpha( TRUE, 0xff, 0xff, 0xff );
    $window->set_icon($transparent);
}

my $box = Gtk3::Box->new( 'vertical', 5 );
$window->add($box);

$box->pack_start( Gtk3::CheckButton->new_with_label('use strict;'),
    FALSE, FALSE, 0 );

$box->pack_start( Gtk3::CheckButton->new_with_label('use warnings;'),
    FALSE, FALSE, 0 );

$box->pack_start( Gtk3::CheckButton->new_with_label('use Gtk3;'),
    FALSE, FALSE, 0 );

my $bbox = Gtk3::ButtonBox->new('horizontal');
$bbox->set_layout('end');
$box->pack_start( $bbox, FALSE, FALSE, 5 );

my $btn = Gtk3::Button->new_from_stock('gtk-apply');
$bbox->add($btn);
$bbox->add( Gtk3::Button->new_from_stock('gtk-close') );

$btn->signal_connect( 'clicked' => \&run );

$window->show_all;

Gtk3->main();

my $fh = FileHandle->new;

sub run {
    open( $fh, "pdftohtml -c -zoom 1.6 -enc UTF-8 \"./ch1.pdf\" |" )
      or die "can't fork";

    my $tag;
    $tag = Gtk3::Helper->add_watch(
        $fh->fileno,
        'in',
        sub {
            watcher_callback( $fh, $tag );
        }
    );
    return;
}

sub watcher_callback {
    my ( $fh, $tag ) = @_;

    my $buffer;

    if ( not sysread( $fh, $buffer, 4096 ) ) {

        Gtk3::Helper->remove_watch($tag)
          or die "couldn't remove watcher";
        close($fh);
        system('echo "1" > status');
        return 1;
    }

    print $buffer;
    system('echo "1" > status');

    return 1;
}

