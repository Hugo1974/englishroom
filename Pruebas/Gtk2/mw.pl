#!/usr/bin/env perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use utf8;
use lib ".";
use Time::HiRes qw(usleep nanosleep);
my $glade_file = "./mw.glade";

my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$glade_file")
  or die "Error: no se encuentra el archivo $glade_file";

my $w = $builder_main->get_object("w")
  or die "Error: no se encuentra el widget w";
my $b = $builder_main->get_object("boton")
  or die "Error: no se encuentra el widget boton";

$b->signal_connect(
    'clicked' => sub {
        system('echo 0 > status');
        $b->set_sensitive('0');
        system('perl assistant.pl&');
        for ( 1 .. 100000000000 ) {
            my $l = 0;

            Gtk3::main_iteration while Gtk3::events_pending;

            open( FILEHANDLER, "<", 'status' ) or die "Error status: $!";
            while ( $l = <FILEHANDLER> ) {
                chomp $l;
                if   ( $l ne 1 ) { next; }
                else             { $b->set_sensitive('1'); }
            }
            close FILEHANDLER;

            if ( defined($l) ) { last if ( $l eq '1' ) }

            usleep(100000);

            Gtk3::main_iteration while Gtk3::events_pending;
        }

    }
);
$w->show_all;

Gtk3::main;
