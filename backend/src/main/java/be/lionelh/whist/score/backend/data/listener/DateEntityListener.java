package be.lionelh.whist.score.backend.data.listener;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

public class DateEntityListener {

    @PrePersist
    public void onPersist(Object inPersistable) {

        ((Persistable) inPersistable).setCreationDate(LocalDateTime.now());
        ((Persistable) inPersistable).setLastUpdateDate(LocalDateTime.now());
    }

    @PreUpdate
    public void onUpdate(Object inPersistable) {
        ((Persistable) inPersistable).setLastUpdateDate(LocalDateTime.now());
    }
}
