#!/usr/bin/perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Gtk3::WebKit2;
use Gtk3::Helper;
use IO::File;
use IO::Pipe;
use Glib qw(TRUE FALSE);
use utf8;
use lib './';

my $uri            = '/home/hugo/Documentos/Libros/Ingles/6-9';
my $WebViewGladeUI = './glib_io_01_glade.glade';
my $make_book_proc = 0;

my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$WebViewGladeUI")
  or die "Error: no se encuentra el asrchivo";

$builder_main->connect_signals(undef);

my $window = $builder_main->get_object("window")
  or die "Error: no se encuentra el widget window";
my $boton = $builder_main->get_object("boton")
  or die "Error: no se encuentra el widget boton";
my $Progressbar = $builder_main->get_object("pb")
  or die "Error: no se encuentra el widget pb";

$boton->signal_connect(
    "clicked",
    sub {
        my $fh = new IO::Pipe;
        my $helper_tag;

        $fh->reader(
"/usr/bin/pdftohtml -c -stdout $uri/animals-also-have-hobbies-Hello_English-FKB.pdf
      "
        );

        Glib::Timeout->add( 100, \&apply_changes_gradually );

        #add a watch to this file handle
        $helper_tag = Gtk3::Helper->add_watch(
            fileno $fh,
            'in',
            sub {
                &watch_callback( $fh, $helper_tag );

            }
        );

    }
);

sub watch_callback {
    my ( $fh, $helper_tag ) = @_;

    my $line;

    #read 1000 caracters of the buffer
    $fh->sysread( $line, 1000 );

    #remove the newline
    #print $line;
    chomp $line;

    if ($line) {
        say $line ;
    }
    else {
        say "Conversión completada";
        $make_book_proc = 1;
        apply_changes_gradually();
        Gtk3::Helper->remove_watch($helper_tag);

    }

    #important so we can loop again
    return 1;
}

sub apply_changes_gradually {
    
    my $fraction = $Progressbar->get_fraction();

    foreach ( ; ; ) {
        if ( $make_book_proc == 1 ) {
            $fraction = 1.0;
            $Progressbar->set_fraction($fraction);
            system('echo "1" > status');
            $builder_main->destroy();
            return FALSE;
            
        }
        else {
            $fraction += 0.01;

            if ( $fraction < 1.0 ) {
                $Progressbar->set_fraction($fraction);
                return TRUE;
            }
            elsif ( $fraction == 0.9 ) {
                $Progressbar->set_fraction($fraction);
                next;
            }
            else {
                system('echo "1" > status');
                return FALSE;
            }
        }
        return $fraction;
    }
    return;
}

$window->show_all();

Gtk3->main();
