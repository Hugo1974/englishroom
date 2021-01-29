package englishroom_config;

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
      EnglishRoomConfig
    );
}

my $config = {};

sub EnglishRoomConfig {
    $config->{EnglishRoomPath}     = $ENV{'HOME'} . "/.atom/github/englishroom/";
    $config->{EnglishRoomConfigFile}     = $config->{EnglishRoomPath} . "data/config/config.pm";
    $config->{EnglishRoomLibs}   = $config->{EnglishRoomPath} . "EnglishRoom/";
    $config->{EnglishRoomUI}      = $config->{EnglishRoomPath} . "data/UI";
    $config->{EnglishRoomDict}   = $config->{EnglishRoomPath} . "data/dicts/";
    $config->{EnglishRoomBin}     = $config->{EnglishRoomPath} . "bin/";
    $config->{PDFTOHTML}     = '/usr/bin/pdftohtml -c ';

    return $config;
}

1;

