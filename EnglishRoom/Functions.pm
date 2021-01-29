package EnglishRoom::Functions;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';
use lib ".";
use EnglishRoom::Config qw(
  UserFiles
  Categories
  BooksURI
  BooksPath
);

BEGIN {
    require Exporter;

    our $VERSION = '0.0';

    our @ISA = qw(Exporter);

    our @EXPORT = qw(
      update_dbs
      PDF2HTML
      get_categories
    );
}

# Functions
sub update_dbs {

    my $user_cats = &get_categories;

    # Obtenemos los datos del nuevo libro
    my ( $title, $age, $cat, $index ) = @_;
    say "$title, $age, $cat";

    # Obtenemos la ruta a los archivos
    my ( undef, undef, undef, $cats, $books_db ) = UserFiles();
    say $books_db;
    say $cats;

    # Registramos el nuevo libro en books.db
    open FILE, "+<", "$books_db" or die "Error: $!\n";
    @_ = <FILE>;
    my $line = $.++;
    print FILE "$line" . "::" . "$title" . "::" . "$age" . "::" . "$cat" . "::"
      . "$index\n";
    close FILE;

    foreach (@$user_cats) {
        say ">> $_";
        if ( $_ eq $cat ) {
            say "$_ es igual a $cat";
            return;
        }
    }

    open FILEC, ">>", "$cats" or die "Error: $!\n";
    print FILEC "$cat\n";
    close FILEC;

}

sub PDF2HTML {
    return '/usr/bin/pdftohtml -c ';
}

sub get_categories {
    my ( undef, undef, undef, $cats ) = UserFiles();
    my @cats;
    say @cats;
    open( FILEHANDLER, "<", $cats ) or die "Error $cats: $!";
    while ( my $c = <FILEHANDLER> ) {
        chomp $c;
        push @cats, $c;
    }
    close FILEHANDLER;
    return \@cats;
}

sub CreateUserFiles {

    #To do
    return;
}

# sub pretty {
#     my ( undef, undef, $hpp ) = split( /\s/, `which html5-print` );

#     # return "/home/hugo/.config/.local/bin/html5-print"; # Ubuntu 18.04
#     return "/usr/local/bin/html5-print";    # Ubuntu 18.04
# }
1;
