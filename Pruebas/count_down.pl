#!/usr/bin/perl -w

use strict;
use Glib qw(TRUE FALSE);
use Gtk2 -init;
use Gtk2::Helper;

use IO::Pipe;

my $uri = '/home/hugo/Documentos/Libros/Ingles/6-9';

#open a pipe to a command
my $fh = new IO::Pipe;
$fh->reader(
"/usr/bin/pdftohtml -c -stdout $uri/animals-also-have-hobbies-Hello_English-FKB.pdf
"
);

#add a watch to this file handle
my $helper_tag = Gtk2::Helper->add_watch(
    fileno $fh,
    'in',
    sub {
        &watch_callback($fh);

    }
);

#standard window creation, placement, and signal connecting
my $window = Gtk2::Window->new('toplevel');
$window->signal_connect( 'delete_event' => sub { exit; } );
$window->set_border_width(5);
$window->set_position('center_always');

my $lbl = Gtk2::Label->new();

#add and show the vbox
$window->add($lbl);
$window->show_all();

#our main event-loop
Gtk2->main;

sub watch_callback {
    Glib::Timeout->add( 100, \&apply_changes_gradually );
    my ($fh) = @_;

    my $line;

    #read 1000 caracters of the buffer
    $fh->sysread( $line, 1000 );

    #remove the newline
    #print $line;
    chomp $line;

    if ($line) {
        $lbl->set_markup(
            "<span font_family ='Eli 5.0b'
					 foreground='green'
					 background='black'
					 size='100000'
					 >$line</span>"
        );
    }
    else {
        $lbl->set_markup(
            "<span font_family ='Eli 5.0b'
					 foreground='red'
					 background='black'
					 size='100000'
					 >EXTINCTION</span>"
        );
        Gtk2::Helper->remove_watch($helper_tag);

    }

    #important so we can loop again
    return 1;
}
