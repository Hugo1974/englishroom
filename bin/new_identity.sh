#!/bin/sh

pidof tor | xargs kill -HUP
