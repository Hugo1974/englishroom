#!/usr/bin/env perl

use strict;
use warnings;
use feature qw(say switch :5.10);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';

BEGIN {
    require Exporter;

    # establecer la versión para la comprobación de versión
    our $VERSION = 0.01;

    # heredar de Exporter para exportar funciones y variables
    our @ISA = qw(Exporter);

    # funciones y variables que se exportan de forma predeterminada
    our @EXPORT =
      qw(agent proxy html_response_file html_formated_file html_formated_file_uri css_uri js_uri pretty);

    # funciones y variables que se exportan de forma opcional
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
    return ('/tmp/formated.html');
}

sub css_uri {
    return ('file:///home/hugo/Workspace/EnglishRoom/data/style.css');
}

sub js_uri {
    return ('file:///home/hugo/Workspace/EnglishRoom/scripts/play_audio.js');
}

sub pretty {
    return '/home/hugo/.config/.local/bin/html5-print';
}

1;
