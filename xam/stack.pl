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
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use Web::Query qw();
use Gtk3 -init;
use Gtk3::WebKit2;
use Glib qw(TRUE FALSE);
use utf8;


my $builder = Gtk3::Builder->new();
$builder->add_from_file('./GtkStack_02-back.glade');

my $window = $builder->get_object('MainWindow');

my $boxviewer = $builder->get_object('VoxViewer');
my $stack = $builder->get_object('stack');
my $page1 = $builder->get_object('page1');
my $page2 = $builder->get_object('page2');

my $stack_menu = $builder->get_object('stack_menu');
my $menu_page1 = $builder->get_object('menu_page1');
my $menu_page2 = $builder->get_object('menu_page2');

my $EventMenu = $builder->get_object('EventMenu');

my $boton1 = $builder->get_object('boton1');
my $boton2 = $builder->get_object('boton2');

$EventMenu->signal_connect( 'enter_notify_event' =>
      sub { $stack_menu->set_visible_child($menu_page2); return; } );
$EventMenu->signal_connect( 'leave_notify_event' =>
      sub { $stack_menu->set_visible_child($menu_page1); return; } );

$boton2->signal_connect(
    'clicked' => sub { $stack->set_visible_child($page1); return; } );
$boton1->signal_connect(
    'clicked' => sub { $stack->set_visible_child($page2); return; } );

my $view = Gtk3::WebKit2::WebView->new();
my $scrolls = Gtk3::ScrolledWindow->new();
$scrolls->add($view);
$boxviewer->add($scrolls);
$view->load_uri( "file:///tmp/formated.html" );
 




$window->signal_connect( destroy => sub { Gtk3->main_quit } );
$window->show_all();




Gtk3->main();

__END__
