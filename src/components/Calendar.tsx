import React, { useState } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import './customTimelineStyles.css';

// Define your types for items and groups
interface Group {
  id: number;
  title: string;
}

interface Item {
  id: number;
  group: number;
  title: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
}

const MyTimelineComponent: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, title: 'PDS-RME01' },
    { id: 2, title: 'PDS-RME02' }
    // more groups...
  ]);

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      group: 1,
      title: 'ISS-Galaxy',
      start_time: moment(),
      end_time: moment().add(1, 'hour')
    },
    {
      id: 2,
      group: 2,
      title: 'SatCom 4',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour')
    }
    // more items...
  ]);

  const handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
    const group = groups[newGroupOrder].id;
    const updatedItems = items.map(item =>
      item.id === itemId
        ? { ...item, start_time: moment(dragTime), end_time: moment(dragTime).add(1, 'hour'), group }
        : item
    );
    setItems(updatedItems);
  };

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-12, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
      onItemMove={handleItemMove}
      canMove={true}
      canResize="both"
      canChangeGroup
      dragSnap={13 * 60 * 1000} // snap to 15 minutes
    />
  );
};

export default MyTimelineComponent;
