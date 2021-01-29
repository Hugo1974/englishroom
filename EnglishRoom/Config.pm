package EnglishRoom::Config;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';
use lib ".";
use lib $ENV{'HOME'} . "/.atom/github/englishroom/data/config";
use lib $ENV{'HOME'} . "/.config/englishroom";
use Data::Dumper;

BEGIN {
    require Exporter;

    our $VERSION = '0.0';

    our @ISA = qw(Exporter);

    our @EXPORT = qw(
      EnglishRoomUI
      EnglishRoomLibs
      Categories
      UserFiles
      BooksURI
      BooksPath
    );
}

sub new {
    use config qw(
      UserConfig
    );
    use englishroom_config qw(
      EnglishRoomConfig
    );
    my $clase = shift;
    my $self  = {@_};

    $self->{opt01} ||= '';
    $self->{opt02} ||= '';
    $self->{opt03} ||= '';
    $self->{opt04} ||= '';
    $self->{opt05} ||= '';
    $self->{UserConfig}        = UserConfig();
    $self->{EnglishRoomConfig} = EnglishRoomConfig();

    #GetUserConf();

    return bless $self, $clase;

}

my $conf = EnglishRoom::Config->new();

# my $user =  $conf->GetUserConf;
# my $er   = $conf->GetEnglishRoomConf;

# Funciones no exportables

# Obtener configuración de usuario
sub GetUserConf {
    say "Exec GetUserConf";
    say Dumper $_[-1]->{UserConfig};
    return $_[-1]->{UserConfig};
}

sub GetEnglishRoomConf {
    say "Exec GetEnglishRoomConf";
    say Dumper $_[-1]->{EnglishRoomConfig};
    return $_[-1]->{EnglishRoomConfig};
}

# Exportables
sub EnglishRoomLibs {
    say "Exec EnglishRoomLibs";
    say $conf->{EnglishRoomConfig}->{EnglishRoomLibs};
    return $conf->{EnglishRoomConfig}->{EnglishRoomLibs};
}

sub CategoriesFile {
    say "Exec RegisterNewCategory";
    say $conf->{UserConfig}->{UserCategories};
    return $conf->{UserConfig}->{UserCategories};
}

sub BooksPath {
    say "Exec BooksPath";
    say $conf->{UserConfig}->{UserHTMLPath};
    return $conf->{UserConfig}->{UserHTMLPath};
}

sub BooksURI {
    say "Exec BooksUTI";
    say "file://" . $conf->{UserConfig}->{UserHTMLPath};
    return "file://" . $conf->{UserConfig}->{UserHTMLPath};
}

sub EnglishRoomUI {
    say "Exec EnglishRoomUI";
    say $conf->{EnglishRoomConfig}->{EnglishRoomUI};
    return $conf->{EnglishRoomConfig}->{EnglishRoomUI};
}

sub UserFiles {
    say "Exec UserFiles";

    return (
        $conf->{UserConfig}->{UserPathData},
        $conf->{UserConfig}->{UserHTMLPath},
        $conf->{UserConfig}->{UserConfigFile},
        $conf->{UserConfig}->{UserCategories},
        $conf->{UserConfig}->{UserBooksDB},
        $conf->{UserConfig}->{UserCategories},
        $conf->{UserConfig}->{UserAgeRange},
        $conf->{UserConfig}->{UserTranslations},
        $conf->{UserConfig}->{UserNotes}
    );
}

# say Dumper UserFiles();
# EnglishRoomUI();

1;
