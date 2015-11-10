package edu.eci.arsw.controller;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.*;
import edu.eci.arsw.model.*;

@RestController
public class EntryController {

    private final AtomicLong counter = new AtomicLong();
    private List<Entry> entries = new ArrayList<>();
    {
        entries.add(new Entry("Title0","Content0"));
        entries.add(new Entry("Title1","Content1"));
    }

    @RequestMapping(method = RequestMethod.GET,value = "/blogs")
    public List<Entry> getEntries() {
        return entries;
    }

    @RequestMapping(method = RequestMethod.POST,value = "/blog")
    public  ResponseEntity<?>  postEntry(@RequestBody Entry p) {
         System.out.println("entro porfin POSTTTTTTTTTT");
        entries.add(p);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

   

    @RequestMapping(method = RequestMethod.DELETE,value = "/blog")
     public void  deleteEntry(@RequestBody int ind) {
        System.out.println("entro delete"+ind);
        entries.remove(ind);
        //entries.add(ind);
        
    }
    @RequestMapping(method = RequestMethod.PUT,value = "/blog/{ind}")
    public  List<Entry>  putEntry(@PathVariable int ind, @RequestBody Entry p) {
         System.out.println("entro PUTTTTTTTTTTO"+"    "+ind+"    "+p.getTitle()+"     "+p.getContent());
        //entries.add(p);
        entries.set(ind,p);
        //entries.get(ind).setTitle(p.getTitle());
        //entries.get(ind).setContent(p.getContent());
        return entries;
    }

}
