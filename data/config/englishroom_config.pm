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
    $config->{EnglishRoomPath} = $ENV{'HOME'} . "/.englishroom/englishroom/";
    $config->{EnglishRoomConfigFile} =
      $config->{EnglishRoomPath} . "data/config/config.pm";
    $config->{EnglishRoomLibs} = $config->{EnglishRoomPath} . "EnglishRoom/";
    $config->{EnglishRoomUI}   = $config->{EnglishRoomPath} . "data/UI";
    $config->{EnglishRoomDict} = $config->{EnglishRoomPath} . "data/dicts/";
    $config->{EnglishRoomBin}  = $config->{EnglishRoomPath} . "bin/";
    $config->{EnglishRoomTmp}  = "/tmp/";
    $config->{PDFTOHTML}       = '/usr/bin/pdftohtml -c ';
    $config->{AGENT} =
'"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0"';
    $config->{PROXY}               = 'socks://127.0.0.1:9050';
    $config->{HtmlResponseFile}    = $config->{EnglishRoomTmp} . 'response.html';
    $config->{HtmlFormatedFile}    = "/tmp/formated.html";
    $config->{HtmlFormatedFileUri} = 'file://' . $config->{EnglishRoomTmp} . 'formated.html';
    $config->{CssUri} =
      "file://" . $config->{EnglishRoomPath} . "data/styles/style.css";
    $config->{JsUri} = "file://" . $config->{EnglishRoomLibs} . "play_audio.js";
    $config->{PRETTY} = "/usr/local/bin/html5-print";
    $config->{NewIdentityExec} = $config->{EnglishRoomBin} . "new_identity.sh";
    return $config;
}

1;

