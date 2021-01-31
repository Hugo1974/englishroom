package config;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';

BEGIN {
    require Exporter;

    our $VERSION = '0.0';

    our @ISA = qw(Exporter);

    our @EXPORT = qw(
      UserConfig
    );
}
package config;

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';

BEGIN {
    require Exporter;

    our $VERSION = '0.0';

    our @ISA = qw(Exporter);

    our @EXPORT = qw(
      UserConfig
    );
}

my $config = {};

sub UserConfig {
    $config->{UserPathData}     = $ENV{'HOME'} . "/.config/englishroom/";
    $config->{UserHTMLPath}     = $config->{UserPathData} . "books/";
    $config->{UserConfigFile}   = $config->{UserPathData} . "config.pm";
    $config->{UserBooksDB}      = $config->{UserPathData} . "books.db";
    $config->{UserCategories}   = $config->{UserPathData} . "categories.db";
    $config->{UserAgeRange}     = $config->{UserPathData} . "age_range.db";
    $config->{UserTranslations} = $config->{UserPathData} . "translations.db";
    $config->{UserNotes}        = $config->{UserPathData} . "notes.db";

    return $config;
}



1;


my $config = {};

sub UserConfig {
    $config->{UserPathData}     = $ENV{'HOME'} . "/.config/englishroom/";
    $config->{UserHTMLPath}     = $config->{UserPathData} . "books/";
    $config->{UserConfigFile}   = $config->{UserPathData} . "config.pm";
    $config->{UserBooksDB}      = $config->{UserPathData} . "books.db";
    $config->{UserCategories}   = $config->{UserPathData} . "categories.db";
    $config->{UserAgeRange}     = $config->{UserPathData} . "age_range.db";
    $config->{UserTranslations} = $config->{UserPathData} . "translations.db";
    $config->{UserNotes}        = $config->{UserPathData} . "notes.db";

    return $config;
}

1;

