#!/usr/bin/env perl

use strict;
use warnings;
use lib ".";
use lib '../';
use feature qw(say switch :5.10);
use Carp qw(croak carp);

use Web::Query qw();
use Gtk3 -init;
use Glib qw(TRUE FALSE);    #use Gtk3::WebKit2;
use Gtk3::Helper;
use FileHandle;
use IO::Pipe;
use open 'locale';
use File::Path qw(mkpath);
use File::Copy qw(copy move);
use Data::Dumper;
use EnglishRoom::Config qw(
  EnglishRoomUI
  UserFiles
  BooksPath
);

use EnglishRoom::Functions qw(
  PDF2HTML
  update_dbs
  get_categories
);

my $make_book_proc = 0;

my %widgets = {
    Status => [
        EntryBookFile  => '0',
        EntryBookTitle => '0',
        ComboAge       => '0',
        ComboCategory  => '0'
    ],
    Value => [
        EntryBookFile  => undef,
        EntryBookTitle => undef,
        ComboAge       => undef,
        ComboCategory  => undef,
    ]
};

my $glade_file = "NewBookAssistant.glade";
my $uri        = EnglishRoomUI() . "/$glade_file";

# starting Builder
my $builder_main = Gtk3::Builder->new();
$builder_main->add_from_file("$uri")
  or die "Error: no se encuentra el archivo NewBookAssistant.glade";

# Ventan principal
my $BookAssistant = $builder_main->get_object("BookAssistant")
  or die "Error: no se encuentra el widget BookAssistant";

# ComboCategory

# Obteniendo páginas
sub BookAssPg1 {
    my $BookAssPg1 = $builder_main->get_object("BookAssPg1")
      or die "Error: no se encuentra el widget BookAssPg1";
    return $BookAssPg1;
}

sub BookAssPg2 {
    my $BookAssPg2 = $builder_main->get_object("BookAssPg2")
      or die "Error: no se encuentra el widget BookAssPg2";
    return $BookAssPg2;
}

sub BookAssPg3 {
    my $BookAssPg3 = $builder_main->get_object("BookAssPg3")
      or die "Error: no se encuentra el widget BookAssPg3";
    return $BookAssPg3;
}

sub BookAssPg4 {
    my $BookAssPg4 = $builder_main->get_object("BookAssPg4")
      or die "Error: no se encuentra el widget BookAssPg4";
    return $BookAssPg4;
}

# Creación de páginas y obteción de sus widgets
# create_page1();

my (
    $EntryBookFile, $EntryBookTitle, $ComboAge,
    $ComboCategory, $BtnFileChooser
) = create_page2();

my $LabBookSumary = create_page3();

my $Progressbar = create_page4();

&add_categories();

# Señales del asistente
$BookAssistant->signal_connect(
    destroy => sub {

        # If this is part of a package (gtk3-demo), then
        # $BookAssistant->destroy();
        # otherwise:
        Gtk3->main_quit;
    }
);

$BookAssistant->signal_connect( cancel  => \&on_assistant_close_cancel );
$BookAssistant->signal_connect( close   => \&on_assistant_close_cancel );
$BookAssistant->signal_connect( apply   => \&on_assistant_apply );
$BookAssistant->signal_connect( prepare => \&on_assistant_prepare );
$BtnFileChooser->signal_connect(
    clicked => sub {
        my $open_dialog = create_filechooser();
        $open_dialog->show_all;
        return;
    }
);
$EntryBookTitle->signal_connect( changed => \&on_changed );
$ComboAge->signal_connect( changed => \&on_changed );
$ComboCategory->signal_connect( changed => \&on_changed );

$BookAssistant->show_all;

Gtk3->main();

# funciones del asistente
sub on_changed {
    my $text = $EntryBookTitle->get_text;
    my $age  = $ComboAge->get_active_text;
    my $cat  = $ComboCategory->get_active_text;

    my $page_num     = $BookAssistant->get_current_page();
    my $current_page = $BookAssistant->get_nth_page($page_num);

    if ($text) {
        $widgets{Status}{EntryBookTitle} = 1;
        $widgets{Value}{EntryBookTitle}  = $text;
    }
    if ($age) {
        $widgets{Status}{ComboAge} = 1;
        $widgets{Value}{ComboAge}  = $age;
    }
    if ($cat) {
        $widgets{Status}{ComboCategory} = 1;
        $widgets{Value}{ComboCategory}  = $cat;
    }

    if ( ( length($text) >= 6 ) and ($age) and ($cat) ) {
        &build_label_confirm( $text, $age, $cat );
        $BookAssistant->set_page_complete( $current_page, TRUE );
    }
    else {
        $BookAssistant->set_page_complete( $current_page, FALSE );
    }

}

sub on_assistant_apply {

    my $fh = new IO::Pipe;
    my $helper_tag;

    my $file = &to_html();

    $fh->reader( PDF2HTML . "\"$file\"" );

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
        say $widgets{Value}{EntryBookTitle};
        say $widgets{Value}{ComboAge};
        say $widgets{Value}{ComboCategory};

        my @index_file = split( "/", $widgets{Value}{EntryBookFile} );
        $index_file[-1] =~ s/\.pdf/\.html/;
        my ( $dir_name, undef ) =~ split( ".", $index_file[-1] );
        say "Directory: $dir_name";
        say "Index: $index_file[-1]";

        update_dbs(
            $widgets{Value}{EntryBookTitle},
            $widgets{Value}{ComboAge},
            $widgets{Value}{ComboCategory},
            BooksPath . $widgets{Value}{EntryBookTitle} . "/" . $index_file[-1]
        );
        apply_changes_gradually( $make_book_proc = 1 );
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
            $BookAssistant->destroy();
            return;
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
}

sub on_assistant_close_cancel {
    system('echo "1" > status');
    $BookAssistant->destroy();
    return FALSE;
}

sub on_assistant_prepare {
    my ( $current_page, $num_pages );

    $current_page = $BookAssistant->get_current_page();
    $num_pages    = $BookAssistant->get_n_pages();

    my $title = sprintf 'Sample assistant (%d of %d)',
      $current_page + 1, $num_pages;
    $BookAssistant->set_title($title);

    if ( $current_page == 3 ) {
        $BookAssistant->commit;
    }
}

# funciones de páginas
sub create_page1 { }

sub create_page2 {
    my $EntryBookFile = $builder_main->get_object("EntryBookFile")
      or die "Error: no se encuentra el widget EntryBookFile";
    my $EntryBookTitle = $builder_main->get_object("EntryBookTitle")
      or die "Error: no se encuentra el widget EntryBooTitle";
    my $ComboAge = $builder_main->get_object("ComboAge")
      or die "Error: no se encuentra el widget ComboAge";
    my $ComboCategory = $builder_main->get_object("ComboCategory")
      or die "Error: no se encuentra el widget ComboCategory";
    my $BtnFileChooser = $builder_main->get_object("BtnFileChooser")
      or die "Error: no se encuentra el widget BtnFileChooser";

    return (
        $EntryBookFile, $EntryBookTitle, $ComboAge,
        $ComboCategory, $BtnFileChooser
    );
}

sub create_page3 {
    my $LabBookSumary = $builder_main->get_object("LabBookSumary")
      or die "Error: no se encuentra el widget LabBookSumary";
    return $LabBookSumary;
}

sub create_page4 {
    my $ProgressBook = $builder_main->get_object("ProgressBook")
      or die "Error: no se encuentra el widget ProgressBook";
    return $ProgressBook;
}

# funciones
sub create_filechooser {
    my $filter = Gtk3::FileFilter->new();
    $filter->set_name('PDF files');
    $filter->add_pattern('*.pdf');
    $filter->add_pattern('*.PDF');

    my $open_dialog =
      Gtk3::FileChooserDialog->new( 'Pick a file', $BookAssistant,
        'open', ( 'gtk-cancel', 'cancel', 'gtk-open', 'accept' ) );
    $open_dialog->set_local_only(FALSE);
    $open_dialog->set_modal(TRUE);

    $open_dialog->signal_connect( 'response' => \&open_response );

    $open_dialog->add_filter($filter);

    return $open_dialog;

}

sub open_response {
    my ( $dialog, $response_id ) = @_;
    my $open_dialog = $dialog;

    # if response id is 'ACCEPTED' (the button 'Open' has been clicked)
    if ( $response_id eq 'accept' ) {
        print "accept was clicked \n";

        my $filename = $open_dialog->get_filename();

        print "opened: $filename \n";
        $EntryBookFile->set_text("$filename");
        $widgets{Value}{EntryBookFile} = $filename;
        $EntryBookTitle->set_sensitive(1);

        $dialog->destroy();
        $open_dialog = create_filechooser;
        return $open_dialog;
    }

    # if response id is 'CANCEL' (the button 'Cancel' has been clicked)
    elsif ( $response_id eq 'cancel' ) {
        print "cancelled: Gtk3::FileChooserAction::OPEN \n";

        $dialog->destroy();
        $open_dialog = create_filechooser;
        return $open_dialog;
    }
    $open_dialog = create_filechooser;
    return $open_dialog;
}

sub build_label_confirm {
    my $label = $LabBookSumary;
    my $title = $widgets{Value}{EntryBookTitle};  #$widgets{Value}{AddBookEntry}
    my $age   = $widgets{Value}{ComboAge};
    my $category = $widgets{Value}{ComboCategory};
    return unless ( defined($title) );
    return unless ( defined($age) );
    return unless ( defined($category) );

    $label->set_markup(
"<span foreground='DarkRed' size='x-large'><b><u>ADD TO LIBRARY</u></b></span>\n
<span foreground='DarkRed' size='large'>Title:   "
          . "</span><span foreground='DarkBlue' size='large'>$title</span>
<span foreground='DarkRed' size='large'>Age:  "
          . "</span><span foreground='DarkBlue' size='large'>$age</span>
<span foreground='DarkRed' size='large'>Category:  "
          . "</span><span foreground='DarkBlue' size='large'>$category</span>\n\n
Pulse <b>[aplicar]</b> para registrar el libro."
    );

    return;
}

sub add_categories {
    my $categories  = get_categories();
    my @sorted_cats = sort { lc($a) cmp lc($b) } @$categories;
    say Dumper @sorted_cats;
    foreach (@sorted_cats) {
        chomp $_;
        say $_;
        $ComboCategory->append_text("$_");
    }
}

sub to_html {

    my ( undef, $boos_dir ) = UserFiles();
    my $html_path = $boos_dir . $widgets{Value}{EntryBookTitle};
    my @pdf_file  = split( "/", $widgets{Value}{EntryBookFile} );

    say "Creando $html_path";

    mkpath("$html_path")
      or die "Error: no se pudo crear el directorio $html_path: $!\n";

    copy( $widgets{Value}{EntryBookFile}, $html_path ) or die "Copy failed: $!";
    chdir "\"$html_path\"";

    my $file = $html_path . "/" . $pdf_file[-1];

    say "Convirtiendo $file";

    return $file;

}

1;
