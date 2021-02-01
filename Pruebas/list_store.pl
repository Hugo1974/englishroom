#!/usr/bin/perl
use warnings;
use strict;
use Gtk2 -init;
use Glib qw/TRUE FALSE/;

my $window = Gtk2::Window->new( "toplevel" );
$window->signal_connect( "destroy", sub { Gtk2->main_quit(); } );
$window->set_default_size(700,300);

my $vbox = Gtk2::VBox->new( 0, 5 );
#$vbox->set_size_request(0,0);

my $model = Gtk2::ListStore->new(
               			    "Glib::String",  #col0
				    "Glib::String",  #col1
				    "Glib::String",  #col2 easy to use string for ints
                                    "Glib::String",  #col3
				    "Glib::String",  #col4
				    "Glib::Boolean", #col5
                                    "Glib::Double",  #col6
				    'Gtk2::Gdk::Pixbuf', #col7
				  );

#some pixbufs to play with
my $pixbuf = Gtk2::Button->new->render_icon ('gtk-home', 'large-toolbar');
my $pixbuf1 = Gtk2::Button->new->render_icon ('gtk-close', 'large-toolbar');
my @pixbufs = ($pixbuf,$pixbuf1);

$model->set( $model->append, 0 => 'Joe', 
                             1 => 'Schmoe',
                             2 =>  1, 
			     3 => 'two',
			     4 => 'foo',
			     5 =>  1,
			     6 =>  11.11 ,
			     7 =>  $pixbuf
			     );

my @data = (
      ['Billy','Bobo',7,'eight','baz',0,12.54,$pixbuf ],
      ['Willie','Wonka',4,'four','bar',1,33.33,$pixbuf ],
      ['Johnny','Ginger',9,'one','foo',1,44.44,$pixbuf ],
      ['Clyde','Hopper',4,'four','baz',1,99.99,$pixbuf ],
);

foreach my $set(@data) {
 $model->set( $model->append, 
       0, $set->[0],
       1, $set->[1],
       2, $set->[2],
       3, $set->[3],
       4, $set->[4],
       5, $set->[5],
       6, $set->[6],
       7, $set->[7]
 );
}

############ Column0 setup ##############################################
###########################################################################
my $col0 = 0;
my $renderer_0 = Gtk2::CellRendererText->new;
$renderer_0->set( editable => TRUE );
$renderer_0->signal_connect( edited => sub { &process_editing( @_, $col0 ); } );
############################################################################
my $column_0 = Gtk2::TreeViewColumn->new_with_attributes(
			    "  Text1   ",
			    $renderer_0,
		           'text' => $col0
				);
###########################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

############ Column1 setup ##############################################
my $col1 = 1;
my $renderer_1 = Gtk2::CellRendererText->new;
$renderer_1->set( editable => TRUE );
$renderer_1->signal_connect( edited => sub { &process_editing( @_, $col1 ); } );

##########################################################################
my $column_1 = Gtk2::TreeViewColumn->new_with_attributes(
			  "    Text2   ",
			   $renderer_1,
			  'text' => $col1
			    );
#############################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

############ Column2 setup ##############################################
#############################################################################
my $col2 = 2;
my $combo_model2 = Gtk2::ListStore->new(
				"Glib::String"
				      );
foreach my $choice (1,2,3,4,5,){
	$combo_model2->set($combo_model2->append,0,$choice );
}

my $renderer_2 = Gtk2::CellRendererCombo->new;

$renderer_2->set(
		    editable	=> TRUE,
		    text_column	=> 0,
		    has_entry	=> TRUE,
		    model	=> $combo_model2
		);

$renderer_2->signal_connect( edited => sub { &process_editing( @_, $col2 ); } );

my $column_2 = Gtk2::TreeViewColumn->new_with_attributes(
			"Combo Drop",
			$renderer_2,
			text => $col2
			);

#############################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

############ Column3 setup ##############################################
my $col3 = 3;
my $combo_model3 = Gtk2::ListStore->new( "Glib::String" );

foreach my $choice ('one','two','three','four','five'){
	$combo_model3->set($combo_model3->append,0,$choice );
}

my $renderer_3 = Gtk2::CellRendererCombo->new;

$renderer_3->set(
		    editable	=> TRUE,
		    text_column	=> 0,
		    has_entry	=> TRUE,
		    model	=> $combo_model3
		);

$renderer_3->signal_connect( edited => sub { &process_editing( @_, $col3 ); } );

my $column_3 = Gtk2::TreeViewColumn->new_with_attributes(
			"Combo Drop",
			$renderer_3,
			text => $col3
			);

###################################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

############ Column4 setup ##############################################
my $col4 = 4;
my $combo_model4 = Gtk2::ListStore->new( "Glib::String" );

foreach my $choice ('foo','bar','baz','buz','fum'){
	$combo_model4->set($combo_model4->append,0,$choice );
}

my $renderer_4 = Gtk2::CellRendererCombo->new;

$renderer_4->set(
		    editable	=> TRUE,
		    text_column	=> 0,
		    has_entry	=> FALSE,  #makes a pure popup
		    model	=> $combo_model4
		);

$renderer_4->signal_connect( edited => sub { &process_editing( @_, $col4 ); } );

my $column_4 = Gtk2::TreeViewColumn->new_with_attributes(
			"Combo PoP",
			$renderer_4,
			text => $col4
			);

###################################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

############ Column5 setup ##############################################
my $col5 = 5;
#my $togglemodel = Gtk2::ListStore -> new(qw(Glib::Boolean));

my $renderer_5 = Gtk2::CellRendererToggle->new();

$renderer_5->set( activatable => 1 );

$renderer_5->signal_connect(
                    toggled => sub { &process_toggle(@_, $col5) }
                 );

my $column_5 = Gtk2::TreeViewColumn->new_with_attributes (
                       ' On/Off ',
                      $renderer_5,
		     );

$column_5->set_resizable (TRUE);

# set initial value on display
$column_5->set_cell_data_func( $renderer_5, sub { &render_toggle_cell( @_, $col5 ); } );
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


############ Column6 setup ##############################################
my $col6 = 6;

my $renderer_6 = Gtk2::CellRendererSpinButtonZ->new();

$renderer_6->set(
    mode   => "editable",
    xalign => 0.0,
    min    => 0,
    max    => 1000,
    step   => 1.0,
    digits => 2
);

$renderer_6->set(
 	    editable	=> TRUE,
	    value	=> $col6,
	);

$renderer_6->signal_connect(edited => sub { &spincell_edited(@_, $col6 ); } );

my $column_6 = Gtk2::TreeViewColumn->new_with_attributes(
			"     Spin      ",
			$renderer_6,
			value => $col6
			);

###################################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

############ Column7 setup ##############################################
my $col7 = 7;
my $combo_model7 = Gtk2::ListStore->new( 'Gtk2::Gdk::Pixbuf' );

my $renderer_7 = Gtk2::CellRendererPixbuf->new;


$renderer_7->signal_connect( 'editing-started' => sub { print "@_\n"  } );

my $column_7 = Gtk2::TreeViewColumn->new_with_attributes(
			"Icon",
			$renderer_7,
		       pixbuf => $col7
		);


###################################################################################
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


###############################################################################
##############################################################################

# main program starts
my $treeview = Gtk2::TreeView->new( $model );

# a TreeSelection
$treeview->get_selection->set_mode ('extended');

$treeview->set_rules_hint( TRUE );

$treeview->append_column( $column_0 );
$treeview->append_column( $column_1 );
$treeview->append_column( $column_2 );
$treeview->append_column( $column_3 );
$treeview->append_column( $column_4 );
$treeview->append_column( $column_5 );
$treeview->append_column( $column_6 );
$treeview->append_column( $column_7 );


my $sw = Gtk2::ScrolledWindow->new( undef, undef );
$sw->set_shadow_type( "etched-in" );
$sw->set_policy( "never", "always" );

$sw->add( $treeview );

$vbox->pack_start( $sw, 1, 1, 0 );

my $button = Gtk2::Button->new( "Dump Values" );
$button->signal_connect( "clicked" => sub { &dump_values(@_); } );

$vbox->pack_start( $button, 0, 0, 0 );

my $button1 = Gtk2::Button->new( "Test Button" );

$button1->signal_connect( "clicked" => sub { 
       
		   } );

$vbox->pack_start( $button1, 0, 0, 0 );

$window->add( $vbox );
$window->show_all;

Gtk2->main;
############################################################################
sub process_editing {
    
    my ( $renderer, $text_path, $new_text, $column ) = @_;
    
    my $path = Gtk2::TreePath->new_from_string ($text_path);
    my $iter = $model->get_iter ($path);
    
#update the underlying model
$model->set( $iter, $column, $new_text);
    
}
##############################################################################
sub process_toggle{

           my ($cell, $row_num, $column) = @_;
           my $path = Gtk2::TreePath->new_from_string ($row_num);
           # get toggled iter
           my $iter = $model->get_iter($path);

	   my ($toggle_item) = $model->get ($iter,$column);
	       
           # flip the value
           $toggle_item ^= 1;

           # set new value in underlying model 
           $model->set ($iter, $column, $toggle_item);

          
	  
	  #link this to the icon displayed in col7
	  if($toggle_item){
        	    $model->set( $iter, 7 =>  $pixbufs[0] );
              }else{$model->set( $iter, 7 =>  $pixbufs[1] );   }



}
###############################################################################
sub render_toggle_cell {
  my($tcolview,$cell,$model,$iter, $column) = @_;
#  print "$tcolview, $cell, $model, $iter, $column\n";

  my ($toggle_item) = $model->get ($iter, $column);
  
  if($toggle_item){
      $cell->set_active(1);
     }else{$cell->set_active(0)}

}

###############################################################################
sub spincell_edited {
   my ( $renderer, $row, $new_text, $column ) = @_;
    
   my $path = Gtk2::TreePath->new_from_string ($row);
   my $iter = $model->get_iter ($path);
    
   #update the underlying model
   $model->set( $iter, $column, $new_text);
}
#############################################################################


sub dump_values {
    
    my $treeselection = $treeview->get_selection;
#    print "$treeselection\n";
#for a single selection mode
   my $iter = $treeselection->get_selected;
   # my $iter = $model->get_iter_first;
 print  $model->get( $iter, 0 );

# #for multiple selection mode    
#     my @selpaths = $treeselection->get_selected_rows;
# # read perldoc Gtk2::Tree::Model Gtk2::Tree::Selection

#   foreach my $tpath(@selpaths){    
#      my $iter = $model->get_iter($tpath);
#     print  $model->get( $iter, 0 ) . '--';
#     print  $model->get( $iter, 1 ) . '--';
#     print  $model->get( $iter, 2 ) . '--';
#     print  $model->get( $iter, 3 ) . '--';
#     print  $model->get( $iter, 4 ) . '--';
#     print  $model->get( $iter, 5 ) . '--';
#     print  $model->get( $iter, 6 ) . '--';
#     print  $model->get( $iter, 7 ) . '--';
    
#     print "\n";
#   }
    
}
################################################################################
# package Gtk2::CellRendererSpinButtonZ;
#
# with a simple example usage
#
#this package is based on the Mup::CellRendererSpinButton
#by muppet, but added
#
# 1.  an extra signal handler for the focus-out to set
#     the spinbox, when going out of focus
#     ( It was muppet's suggestion) :-)

package Gtk2::CellRendererSpinButtonZ;
use POSIX qw(DBL_MAX UINT_MAX);
use constant x_padding => 2;
use constant y_padding => 3;
use Gtk2::Gdk::Keysyms;

use Glib::Object::Subclass "Gtk2::CellRenderer",
 signals => {
   edited => {
      flags       => [ qw(run-last) ],
      param_types => [ qw(Glib::String Glib::Double) ],
   },
 },
 properties => [
   Glib::ParamSpec->double(
      "xalign", "Horizontal Alignment",
      "Where am i?", 0.0, 1.0, 1.0, [ qw(readable writable) ]
   ),
   Glib::ParamSpec->boolean(
      "editable",           "Editable",
      "Can I change that?", 0,
      [ qw(readable writable) ]
   ),
   Glib::ParamSpec->uint(
      "digits",             "Digits",
      "How picky are you?", 0,
      UINT_MAX,             2,
      [ qw(readable writable) ]
   ),
   map {
      Glib::ParamSpec->double(
         $_->[ 0 ],
         $_->[ 1 ],
         $_->[ 2 ],
         0.0, DBL_MAX,
         $_->[ 3 ],
         [ qw(readable writable) ]
       )
    } (
      [ "value", "Value", "How much is the fish?",    0.0 ],
      [ "min",   "Min",   "No way, I have to live!",  0.0 ],
      [ "max",   "Max",   "Ah, you're too generous.", 100.0 ],
      [ "step",  "Step",  "Okay.",                    5.0 ]
    )
 ];

sub INIT_INSTANCE {
   my $self = shift;
   $self->{ editable } = 0;
   $self->{ digits }   = 2;
   $self->{ value }    = 0.0;
   $self->{ min }      = 0.0;
   $self->{ max }      = 100.0;
   $self->{ step }     = 5.0;
   $self->{ xalign }   = 1.0;
}

sub calc_size {
   my ( $cell, $layout, $area ) = @_;
   my ( $width, $height ) = $layout->get_pixel_size();

   return (
        $area
      ? $cell->{ xalign } * ( $area->width - ( $width + 3 * x_padding ) )
      : 0,
      0,
      $width + x_padding * 2,
      $height + y_padding * 2
   );
}

sub format_text {
   my $cell = shift;
   my $format = sprintf '%%.%df', $cell->{ digits };
   sprintf $format, $cell->{ value };
}

sub GET_SIZE {
   my ( $cell, $widget, $area ) = @_;

   my $layout = $cell->get_layout( $widget );
   $layout->set_text( $cell->format_text );

   return $cell->calc_size( $layout, $area );
}

sub get_layout {
   my ( $cell, $widget ) = @_;

   return $widget->create_pango_layout( "" );
}

sub RENDER {
   my ( $cell, $window, $widget, $background_area, $cell_area, $expose_area,
      $flags )
    = @_;
   my $state;

   if ( $flags & 'selected' ) {
      $state =
       $widget->has_focus()
       ? 'selected'
       : 'active';
   }
   else {
      $state =
       $widget->state() eq 'insensitive'
       ? 'insensitive'
       : 'normal';
   }

   my $layout = $cell->get_layout( $widget );
   $layout->set_text( $cell->format_text );

   my ( $x_offset, $y_offset, $width, $height ) =
    $cell->calc_size( $layout, $cell_area );
   $widget->get_style->paint_layout(
      $window,
      $state,
      1,
      $cell_area,
      $widget,
      "cellrenderertext",
      $cell_area->x() + $x_offset + x_padding,
      $cell_area->y() + $y_offset + y_padding,
      $layout
   );
}

sub START_EDITING {
   my ( $cell, $event, $view, $path, $background_area, $cell_area, $flags ) =
    @_;
   my $spin_button =
    Gtk2::SpinButton->new_with_range( $cell->get( qw(min max step) ) );

   $spin_button->set_value( $cell->get( "value" ) );
   $spin_button->set_digits( $cell->get( "digits" ) );
   $spin_button->grab_focus();

   $spin_button->signal_connect(
      key_press_event => sub {
         my ( $event_box, $event ) = @_;

         if (  $event->keyval == $Gtk2::Gdk::Keysyms{ Return }
            || $event->keyval == $Gtk2::Gdk::Keysyms{ KP_Enter } )
         {
            $spin_button->update();
            $cell->signal_emit( edited => $path, $spin_button->get_value() );
            $spin_button->destroy();
            return 1;
         }
         elsif ( $event->keyval == $Gtk2::Gdk::Keysyms{ Up } ) {
            $spin_button->spin( 'step-forward',
               ( $spin_button->get_increments() )[ 0 ] );
            return 1;
         }
         elsif ( $event->keyval == $Gtk2::Gdk::Keysyms{ Down } ) {
            $spin_button->spin( 'step-backward',
               ( $spin_button->get_increments() )[ 0 ] );
            return 1;
         }
         return 0;
       }

   );

   $spin_button->signal_connect(
      'focus-out-event' => sub {
         my ( $event_box, $event ) = @_;
         $spin_button->update();
         $cell->signal_emit( edited => $path,   $spin_button->get_value() );

         return 0;
      }
   );

   $spin_button->show_all();

   return $spin_button;
}
1;

################################################################

