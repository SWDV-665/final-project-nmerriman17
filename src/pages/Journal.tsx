import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonInput,
  IonModal,
  IonThumbnail,
  IonImg,
  IonToast,
} from '@ionic/react';
import './Journal.css';
import {
  add,
  trash,
  create,
  image,
  calendar,
  informationCircle,
  documentTextOutline,
} from 'ionicons/icons';

const Journal: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<
    Array<{
      id: number;
      title: string;
      image: string | null;
      note: string;
      startDate: string;
      endDate: string;
    }>
  >([]);

  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState('');
  const [newTripImage, setNewTripImage] = useState<File | null>(null);
  const [newTripNote, setNewTripNote] = useState('');
  const [newTripStartDate, setNewTripStartDate] = useState('');
  const [newTripEndDate, setNewTripEndDate] = useState('');

  const [showEditToast, setShowEditToast] = useState(false);
  const [editToastMessage, setEditToastMessage] = useState('');

  const [editingEntryId, setEditingEntryId] = useState<number | null>(null); // Track the entry being edited

  const handleAddTrip = () => {
    if (newTripTitle.trim() !== '') {
      const newTrip = {
        id: Date.now(),
        title: newTripTitle,
        image: newTripImage ? URL.createObjectURL(newTripImage) : null,
        note: newTripNote,
        startDate: newTripStartDate,
        endDate: newTripEndDate,
      };
      setJournalEntries([...journalEntries, newTrip]);
      setNewTripTitle('');
      setNewTripImage(null);
      setNewTripNote('');
      setNewTripStartDate('');
      setNewTripEndDate('');
      setShowAddTripModal(false);

      setEditToastMessage('Trip added successfully!');
      setShowEditToast(true);
    }
  };

  const handleDeleteEntry = (id: number) => {
    const updatedEntries = journalEntries.filter((entry) => entry.id !== id);
    setJournalEntries(updatedEntries);
  };

  const handleEditEntry = (
    id: number,
    newTitle: string,
    newNote: string,
    newStartDate: string,
    newEndDate: string
  ) => {
    const updatedEntries = journalEntries.map((entry) =>
      entry.id === id
        ? {
            ...entry,
            title: newTitle,
            note: newNote,
            startDate: newStartDate,
            endDate: newEndDate,
          }
        : entry
    );
    setJournalEntries(updatedEntries);

    setEditToastMessage('Entry edited successfully!');
    setShowEditToast(true);

    setEditingEntryId(null); // Reset the editing state
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Journal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {journalEntries.map((entry) => (
            <IonItem key={entry.id}>
              {entry.image && !editingEntryId && (
                <IonThumbnail slot="start" style={{ width: '10rem', height: '10rem' }}>
                  <IonImg src={entry.image} />
                </IonThumbnail>
              )}
              <IonLabel>
                <h1>
                  {editingEntryId === entry.id ? (
                    <strong>{entry.title}</strong>
                  ) : (
                    <strong>{entry.title}</strong>
                  )}
                </h1>
                <IonIcon slot="start" />
                <p>Start Date: {entry.startDate}</p>
                <IonIcon slot="start" />
                <p>End Date: {entry.endDate}</p>
                <IonIcon slot="start" />
                <p>{entry.note}</p>
              </IonLabel>
              <IonButton onClick={() => handleDeleteEntry(entry.id)}>
                <IonIcon icon={trash} />
              </IonButton>
              <IonButton
                onClick={() => {
                  setEditingEntryId(entry.id);
                  setNewTripTitle(entry.title);
                  setNewTripNote(entry.note);
                  setNewTripStartDate(entry.startDate);
                  setNewTripEndDate(entry.endDate);
                }}
              >
                {editingEntryId === entry.id ? (
                  'Save'
                ) : (
                  <IonIcon icon={create} />
                )}
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={() => setShowAddTripModal(true)} expand="block">
          <IonIcon icon={add} slot="start" />
          Add Trip Information
        </IonButton>

        <IonModal isOpen={showAddTripModal || editingEntryId !== null}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{editingEntryId !== null ? 'Edit Trip' : 'Add Trip'}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: '20px' }}>
              <IonItem>
                <IonIcon icon={informationCircle} slot="start" />
                <IonInput
                  placeholder="Trip Name"
                  value={newTripTitle}
                  onIonChange={(e) => setNewTripTitle(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonIcon icon={image} slot="start" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewTripImage(e.target.files && e.target.files[0])}
                />
              </IonItem>
              <IonItem>
                <IonIcon icon={documentTextOutline} slot="start" />
                <IonInput
                  placeholder="Short Summary"
                  value={newTripNote}
                  onIonChange={(e) => setNewTripNote(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonIcon icon={calendar} slot="start" />
                <IonInput
                  type="date"
                  placeholder="Start Date"
                  value={newTripStartDate}
                  onIonChange={(e) => setNewTripStartDate(e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonIcon icon={calendar} slot="start" />
                <IonInput
                  type="date"
                  placeholder="End Date"
                  value={newTripEndDate}
                  onIonChange={(e) => setNewTripEndDate(e.detail.value!)}
                />
              </IonItem>
              <IonButton
                onClick={() => {
                  editingEntryId !== null
                    ? handleEditEntry(
                        editingEntryId,
                        newTripTitle,
                        newTripNote,
                        newTripStartDate,
                        newTripEndDate
                      )
                    : handleAddTrip();
                  setShowAddTripModal(false); // Close the modal
                }}
              >
                {editingEntryId !== null ? 'Save' : 'Add'}
              </IonButton>
              <IonButton
                onClick={() => {
                  setShowAddTripModal(false); // Close the modal
                  setEditingEntryId(null); // Reset the editing state
                }}
              >
                Cancel
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showEditToast}
          onDidDismiss={() => setShowEditToast(false)}
          message={editToastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Journal;
