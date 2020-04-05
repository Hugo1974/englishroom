import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

class PyApp(Gtk.Window()):
   
   def __init__(self):
      super(PyApp, self).__init__()
      
	  self.set_title("Clipboard demo")
      self.set_size_request(300,200)
      self.set_position(gtk.WIN_POS_CENTER)
		
      vbox = gtk.VBox(False, 5)
      self.tv1 = gtk.TextView()
		
      vbox.add(self.tv1)
      self.tv2 = gtk.TextView()
		
      vbox.add(self.tv2)
      hbox = gtk.HBox(True, 3)
		
      Set = gtk.Button("set")
      Set.set_size_request(70, 30)
		
      retrieve = gtk.Button("retrieve")
      hbox.add(Set)
      hbox.add(retrieve)
      halign = gtk.Alignment(1, 0, 0, 0)
      halign.add(hbox)
		
      vbox.pack_start(halign, False, False, 3)
      self.add(vbox)
      Set.connect("clicked", self.on_set)
      retrieve.connect("clicked", self.on_retrieve)
      self.connect("destroy", gtk.main_quit)
      self.show_all()
		
   def on_set(self, widget):
      buf = self.tv1.get_buffer()
      text = buf.get_text(buf.get_start_iter(), buf.get_end_iter())
      self.clipboard = gtk.clipboard_get()
      self.clipboard.set_text(text)
      self.clipboard.store()
		
   def on_retrieve(self, widget):
      self.clipboard.request_text(self.readclipboard, user_data=None)
		
   def readclipboard(self, clipboard, text, data):
      buffer = gtk.TextBuffer()
      buffer.set_text(text)
      self.tv2.set_buffer(buffer)

PyApp()
gtk.main()