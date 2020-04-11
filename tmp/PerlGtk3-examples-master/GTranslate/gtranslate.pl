#!/usr/bin/perl

#Copyright 2020 Hugo Morago Martín.
#
#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.
#
#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.
#
#You should have received a copy of the GNU General Public License
#along with this program.  If not, see L<http://www.gnu.org/licenses/>.


use strict;
use warnings;
use utf8;
use open 'locale';
use Encode;
use feature ':5.10';
use LWP::Simple;
use LWP::UserAgent;
use Gtk3 '-init';
use Glib 'TRUE', 'FALSE';
use JSON::MaybeXS qw(encode_json decode_json);

my $traduccion;

my $window  = Gtk3::Window->new('toplevel');
my $box     = Gtk3::Box->new( 'vertical', 2 );
my $btn_box = Gtk3::Box->new( 'horizontal', 1 );
my $sw      = Gtk3::ScrolledWindow->new();

$window->set_title('Traductor de contenido del portapapeles');
$window->signal_connect( destroy => sub { Gtk3->main_quit } );
$window->set_size_request( 550, 200 );
$box->set_border_width(15);

my $buffer = Gtk3::TextBuffer->new();
my $tw     = Gtk3::TextView->new_with_buffer($buffer);
$tw->set_wrap_mode('word');

my $exit_btn = Gtk3::Button->new_from_stock('gtk-quit');
$exit_btn->signal_connect( clicked => sub { Gtk3->main_quit } );
my $get_btn = Gtk3::Button->new('Traducir');
$get_btn->signal_connect( clicked => \&translate );

$window->add($box);
$sw->add($tw);

$btn_box->pack_start( $get_btn, FALSE, FALSE, 5 );
$btn_box->pack_end( $exit_btn, FALSE, FALSE, 5 );
$box->pack_start( $sw, TRUE, TRUE, 5 );
$box->pack_end( $btn_box, FALSE, FALSE, 5 );

$window->show_all;
Gtk3->main;

sub get_buffer {
    my ($txt) = shift;
    $buffer->delete( $buffer->get_start_iter, $buffer->get_end_iter );
    my $iter = $buffer->get_start_iter;
    $buffer->insert( $iter, $txt );
    $tw->show_all;
    return $buffer;
}

sub translate {
    my $xsel = `echo \"\$(xsel -o)"`;

    my $browser = LWP::UserAgent->new();
    $browser->proxy( [qw(http https)] => 'socks://127.0.0.1:9050' );
    $browser->agent(
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0'
    );
    $browser->timeout(10);
    $browser->protocols_allowed( [ 'http', 'https' ] );

    Gtk3::main_iteration while Gtk3::events_pending;
    my $res = $browser->get(
"http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=$xsel"
    );
    Gtk3::main_iteration while Gtk3::events_pending;

    my @str_json   = $res->content;
    my @dcded_json = decode_json "@str_json";

    my @trstrg;
    foreach my $a ( $dcded_json[0][0] ) {
        foreach ( my $b = 0 ; $b <= $#$a ; $b++ ) {
            push @trstrg, $$a[$b][0];
        }
    }

    my $str = "@trstrg";
    &get_buffer("$str");
    return $str;
}
