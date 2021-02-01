#!/usr/bin/env perl 

use strict;
use warnings;
use feature qw(say switch :5.10);
use Cwd qw(getcwd);
use Carp qw(croak carp);
use utf8;
use Encode;
use open 'locale';

# Los siguiente packetes dependen de perl-base y no es necesario instalarlos.
# El resto están en los repositorios tanto de ubuntu 18.04 como 19.10
# 'libperl5.26:/usr/lib/x86_64-linux-gnu/perl/5.26.1/Config_git.pl',
# 'perl-modules-5.26:/usr/share/perl/5.26.1/AutoLoader.pm',

my @modules = (
    'perl-base:/usr/lib/x86_64-linux-gnu/perl-base/AutoLoader.pm',
'libcairo-gobject-perl:/usr/lib/x86_64-linux-gnu/perl5/5.26/Cairo/GObject.pm',
    'libcairo-perl:/usr/lib/x86_64-linux-gnu/perl5/5.26/Cairo.pm',
'libglib-object-introspection-perl:/usr/lib/x86_64-linux-gnu/perl5/5.26/Glib/Object/Introspection.pm',
    'libglib-perl:/usr/lib/x86_64-linux-gnu/perl5/5.26/Glib.pm',
    'libgtk3-perl:/usr/share/perl5/Gtk3.pm',
    'libgtk3-webkit2-perl:/usr/share/perl5/Gtk3/WebKit2.pm',
    'libhtml-tree-perl:/usr/share/perl5/HTML/Element.pm',
    'libhtml-parser-perl:/usr/lib/x86_64-linux-gnu/perl5/5.26/HTML/Entities.pm',
    'libhtml-selector-xpath-perl:/usr/share/perl5/HTML/Selector/XPath.pm',
    'libhtml-tagset-perl:/usr/share/perl5/HTML/Tagset.pm',
    'libhtml-treebuilder-xpath-perl:/usr/share/perl5/HTML/TreeBuilder/XPath.pm',
    'libhttp-message-perl:/usr/share/perl5/HTTP/Config.pm',
    'libhttp-date-perl:/usr/share/perl5/HTTP/Date.pm',
    'libio-socket-socks-perl:/usr/share/perl5/IO/Socket/Socks.pm',
    'libio-socket-ssl-perl:/usr/share/perl5/IO/Socket/SSL.pm',
    'liblwp-protocol-https-perl:/usr/share/perl5/LWP/Protocol/https.pm',
    'libwww-perl:/usr/share/perl5/LWP/MemberMixin.pm',
    'liblwp-protocol-socks-perl:/usr/share/perl5/LWP/Protocol/socks.pm',
    'libnet-http-perl:/usr/share/perl5/Net/HTTP/Methods.pm',
    'libnet-ssleay-perl:/usr/lib/x86_64-linux-gnu/perl5/5.26/Net/SSLeay.pm',
    'libtry-tiny-perl:/usr/share/perl5/Try/Tiny.pm',
    'liburi-perl:/usr/share/perl5/URI/Escape.pm',
    'libxml-xpathengine-perl:/usr/share/perl5/XML/XPathEngine/Boolean.pm',
    'libgtk3-webkit2-perl:/usr/share/perl5/Gtk3/WebKit2.pm',
    'libweb-query-perl:/usr/share/perl5/Web/Query.pm'
);

foreach my $x (@modules) {
    my ( $name, $file ) = split( ':', $x );
    say "$name:";
    say "Version:";
    say `dpkg-query --showformat=\'\${Version}\' --show $name` . "\n";
    say "Available versions:";
    say `apt-cache showpkg  $name|grep -e "^[0-9].*(/" | awk {\'print \$1\'}`;

    # say `dpkg-query --load-avail --show $name`;
    say "Instaled versión";
    say `apt-cache policy $name|grep -e "\\*\\*\\*"` . "\n\n";

}

