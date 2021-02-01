# open a pipe to a ls command
use FileHandle;
my $fh = FileHandle->new;
open( $fh, "ls -l |" ) or die "can't fork";

# install a read watcher for this pipe
my $tag;
$tag = Gtk3::Helper->add_watch(
    $fh->fileno,
    'in',
    sub {
        watcher_callback( $fh, $tag );
    }
);

sub watcher_callback {
    my ( $fh, $tag ) = @_;

    # we safely can read a chunk into $buffer
    my $buffer;

    if ( not sysread( $fh, $buffer, 4096 ) ) {

        # obviously the connected pipe was closed
        Gtk3::Helper->remove_watch($tag)
          or die "couldn't remove watcher";
        close($fh);
        return 1;
    }

    # do something with $buffer ...
    print $buffer;

    # *always* return true
    return 1;
}
