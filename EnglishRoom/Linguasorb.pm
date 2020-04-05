package Package::Name;

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
      func01,
      func02,
    );
}

sub new {

    my $clase = shift;
    my $self  = {@_};

    $self->{opt01} ||= '';
    $self->{opt02} ||= '';
    $self->{opt03} ||= '';
    $self->{opt04} ||= '';
    $self->{opt05} ||= '';

    return bless $self, $clase;

}

# Functions
sub func01 {

    #...
}

sub func02 {

    #...
}

# Getters
sub get_01 {
    $self = shift;

    #...
}

sub get_02 {
    $self = shift;

    #...
}

# Setters
sub set_01 {
    $self = shift;

    #...
}

sub set_02 {
    $self = shift;

    #...
}

1;
