using { sap.capire.incidents as my } from '@capire/incidents/db/schema';

annotate my.Status with {
    code @criticality {
        new @criticality.Neutral;
        assigned @criticality.Critical;
        in_process @criticality.Critical;
        on_hold @criticality.Negative;
        resolved @criticality.Positive;
        closed  @criticality.Positive;
    }; 
  };

extend my.Urgency {
    criticality: Integer;
};

annotate my.Urgency with {
    code @criticality {
        high @criticality.Negative;
        medium @criticality.Critical;
    }; 
};