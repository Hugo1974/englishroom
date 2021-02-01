package EnglishRoom::Config;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';
use File::Path;
use File::Touch;

BEGIN {
    require Exporter;

    # establecer la versión para la comprobación de versión
    our $VERSION = 0.01;

    # heredar de Exporter para exportar funciones y variables
    our @ISA = qw(Exporter);

    # funciones y variables que se exportan de forma predeterminada
    our @EXPORT = qw(
      agent
      proxy
      html_response_file
      html_formated_file
      html_formated_file_uri
      css_uri
      js_uri
      pretty
      UI_path
      Books_path
      Books_uri
      html_english_words_path
      EnglishRoomUserFiles
      EnglishRoomModPath
      PDF2HTML
      EnglishRoomHtmlFilesDir
      categories
      updateDB
    );

    # funciones y variables que se exportan de forma opcional
}

my $ER_PATH = "/home/hugo/.atom/github/englishroom/";

sub EnglishRoomModPath {
    return $ER_PATH . 'EnglishRoom';
}

sub Books_uri {
    return "file:///$ENV{'HOME'}/.config/englishroom/books/html/";
}

sub Books_path {
    return "$ENV{'HOME'}/.config/englishroom/books/html/";
}

sub agent {
    return (
'"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0"'
    );
}

sub proxy {
    return ('socks://127.0.0.1:9050');
}

sub html_response_file {
    return ('/tmp/response.html');
}

sub html_formated_file_uri {
    return ('file:///tmp/formated.html');
}

sub html_formated_file {
    return ("/tmp/formated.html");
}

sub css_uri {
    return ( "file://" . $ER_PATH . "data/styles/style.css" );
}

sub js_uri {
    return ( "file://" . $ER_PATH . "EnglishRoom/play_audio.js" );
}

sub PDF2HTML {
    return '/usr/bin/pdftohtml -c ';
}

sub pretty {
    my ( undef, undef, $hpp ) = split( /\s/, `which html5-print` );

    # return "/home/hugo/.config/.local/bin/html5-print"; # Ubuntu 18.04
    return "/home/hugo/.local/bin/html5-print";    # Ubuntu 18.04
}

sub linguasorb_html_response_file {
    return "/tmp/";
}

sub UI_path {
    return "$ER_PATH" . "data/UI/";
}

sub html_english_words_path {
    return $ER_PATH . "data/dicts/english/html/";
}

sub EnglishRoomUserFiles {
    my $path     = "$ENV{HOME}/.config/englishroom/";
    my $books_db = $path . 'books.db';
    my $conf     = $path . 'englishroom.cfg';
    my $cats     = $path . 'categories.db';

    for my $f ( $books_db, $conf, $cats ) {
        touch($f);
    }

    unless ( -d $path ) {
        mkpath("$path") or die "Error $path: $!\n";
    }
    return ( $path, $books_db, $conf, $cats );
}

sub EnglishRoomHtmlFilesDir {
    my $path = "$ENV{HOME}/.config/englishroom/books/html/";
    unless ( -d $path ) {
        mkpath("$path") or die "Error $path: $!\n";
    }
    return $path;
}

sub categories {
    my ( $path, $books_db, $conf, $cats ) = EnglishRoomUserFiles;
    my @cats;
    open( FILEHANDLER, "<", $cats ) or die "Error $cats: $!";
    while ( my $c = <FILEHANDLER> ) {
        chomp $c;
        push @cats, $c;
    }
    close FILEHANDLER;
    return \@cats;
}

1;
