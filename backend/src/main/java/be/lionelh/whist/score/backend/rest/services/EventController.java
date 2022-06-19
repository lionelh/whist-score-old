package be.lionelh.whist.score.backend.rest.services;

import be.lionelh.whist.score.backend.data.DataService;
import be.lionelh.whist.score.backend.data.domain.Event;
import be.lionelh.whist.score.backend.rest.vo.DrawVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path =  "/api/events")
public class EventController {

    private DataService dataService;

    @Autowired
    private void setDataService(DataService inDataService) {
        this.dataService = inDataService;
    }

    @RequestMapping(produces = { MediaType.APPLICATION_JSON_VALUE }, method = { RequestMethod.GET})
    public ResponseEntity<List<Event>> findAllSorted() {
        List<Event> l = this.dataService.findAllEventsSorted();

        return new ResponseEntity<>(l, HttpStatus.OK);
    }

    @RequestMapping(consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE }, method = { RequestMethod.POST})
    public ResponseEntity<Event> create(@RequestBody Event inEvent) {
        return new ResponseEntity<>(this.dataService.createOrUpdateEvent(inEvent), HttpStatus.CREATED);
    }

    @RequestMapping(path= "/{id}/details", produces = { MediaType.APPLICATION_JSON_VALUE }, method = { RequestMethod.GET})
    public ResponseEntity<List<DrawVO>> getDetails(@PathVariable("id") long inEventId) {
        return new ResponseEntity(this.dataService.getEventDetails(inEventId), HttpStatus.OK);
    }

    @RequestMapping(path= "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE }, method = { RequestMethod.GET})
    public ResponseEntity<Event> findById(@PathVariable("id") Long inId) {
        return new ResponseEntity<>(this.dataService.findEventById(inId), HttpStatus.OK);
    }

    @RequestMapping(path= "/{id}/draw", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE }, method = { RequestMethod.POST})
    public ResponseEntity<List<DrawVO>> addDraw(@PathVariable("id") Long inEventId, @RequestBody DrawVO inDraw) {
        this.dataService.addDraw(inEventId, inDraw);
        return this.getDetails(inEventId);
    }

    @RequestMapping(path= "/{id}/close", consumes = { MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE }, method = { RequestMethod.POST})
    public ResponseEntity<List<DrawVO>> closeEvent(@PathVariable("id") Long inEventId) {
        this.dataService.closeEvent(inEventId);
        return this.getDetails(inEventId);
    }
}
