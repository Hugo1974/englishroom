#!/bin/sh

/usr/bin/systemctl enable tor &&
pidof tor | xargs kill -HUP
