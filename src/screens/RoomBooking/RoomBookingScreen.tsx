import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { RoomBookingRequest } from '@/types/seva';
import { generateReferenceNumber } from '@/data/sevaData';

const RoomBookingScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    checkInDate: new Date(),
    checkOutDate: new Date(Date.now() + 86400000), // Tomorrow
    numberOfPersons: '1',
    purpose: '',
    specialRequirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose of visit is required';
    if (!consentChecked) newErrors.consent = 'Please accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    try {
      const referenceNumber = generateReferenceNumber('RB');
      
      // In real app, send email to office@sodematha.in
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Booking Request Submitted',
        `Your room booking request has been submitted successfully!\n\nReference: ${referenceNumber}\n\nOur office will contact you shortly to confirm availability.\n\nFor queries, contact:\noffice@sodematha.in\n+91 9483357005`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit booking request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined, isCheckIn: boolean) => {
    if (isCheckIn) {
      setShowDatePicker(false);
      if (selectedDate) {
        setFormData(prev => ({ 
          ...prev, 
          checkInDate: selectedDate,
          checkOutDate: selectedDate > prev.checkOutDate ? new Date(selectedDate.getTime() + 86400000) : prev.checkOutDate
        }));
      }
    } else {
      setShowEndDatePicker(false);
      if (selectedDate) {
        setFormData(prev => ({ ...prev, checkOutDate: selectedDate }));
      }
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Room Booking</Text>
        <Text style={styles.headerSubtitle}>ವಸತಿ ಬುಕಿಂಗ್</Text>
      </View>
      <View style={styles.headerRight} />
    </View>
  );

  const renderInput = (
    label: string,
    field: string,
    placeholder: string,
    keyboardType: any = 'default',
    multiline: boolean = false
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label} *</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          errors[field] && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#8B7355"
        value={formData[field as keyof typeof formData] as string}
        onChangeText={(value) => updateField(field, value)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Icon name="information" size={24} color="#D4AF37" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Room Availability</Text>
              <Text style={styles.infoText}>
                Limited rooms are available at Sode Matha for devotees. Booking is subject to availability and confirmation from the office.
              </Text>
            </View>
          </View>

          {/* Personal Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <Text style={styles.sectionTitleKannada}>ವೈಯಕ್ತಿಕ ವಿವರಗಳು</Text>

            {renderInput('Full Name', 'name', 'Enter your full name')}
            {renderInput('Phone Number', 'phone', 'Enter 10-digit mobile number', 'phone-pad')}
            {renderInput('Email Address', 'email', 'Enter your email', 'email-address')}
          </View>

          {/* Address Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionTitleKannada}>ವಿಳಾಸ</Text>

            {renderInput('Address', 'address', 'Enter your address', 'default', true)}
            
            <View style={styles.row}>
              <View style={styles.halfInput}>
                {renderInput('City', 'city', 'City')}
              </View>
              <View style={styles.halfInput}>
                {renderInput('State', 'state', 'State')}
              </View>
            </View>
            
            {renderInput('Pincode', 'pincode', 'Enter 6-digit pincode', 'number-pad')}
          </View>

          {/* Stay Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stay Details</Text>
            <Text style={styles.sectionTitleKannada}>ವಾಸ್ತವ್ಯ ವಿವರಗಳು</Text>

            {/* Date Pickers */}
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Check-in Date *</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Icon name="calendar" size={20} color="#D4AF37" />
                  <Text style={styles.dateText}>{formatDate(formData.checkInDate)}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Check-out Date *</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Icon name="calendar" size={20} color="#D4AF37" />
                  <Text style={styles.dateText}>{formatDate(formData.checkOutDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={formData.checkInDate}
                mode="date"
                minimumDate={new Date()}
                onChange={(e, date) => onDateChange(e, date, true)}
              />
            )}

            {showEndDatePicker && (
              <DateTimePicker
                value={formData.checkOutDate}
                mode="date"
                minimumDate={new Date(formData.checkInDate.getTime() + 86400000)}
                onChange={(e, date) => onDateChange(e, date, false)}
              />
            )}

            {renderInput('Number of Persons', 'numberOfPersons', 'Enter number', 'number-pad')}
            {renderInput('Purpose of Visit', 'purpose', 'e.g., Aradhana, Darshan, etc.', 'default', true)}
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Special Requirements (Optional)</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Any special requirements or requests"
                placeholderTextColor="#8B7355"
                value={formData.specialRequirements}
                onChangeText={(value) => updateField('specialRequirements', value)}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Consent Section */}
          <TouchableOpacity
            style={styles.consentContainer}
            onPress={() => setConsentChecked(!consentChecked)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, consentChecked && styles.checkboxChecked]}>
              {consentChecked && <Icon name="check" size={16} color="#FFF" />}
            </View>
            <Text style={styles.consentText}>
              I understand that room availability is subject to confirmation and I agree to follow the Matha's guidelines during my stay.
            </Text>
          </TouchableOpacity>
          {errors.consent && <Text style={styles.errorText}>{errors.consent}</Text>}

          {/* Contact Info */}
          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>For Queries</Text>
            <View style={styles.contactItem}>
              <Icon name="email" size={18} color="#922B3E" />
              <Text style={styles.contactText}>office@sodematha.in</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="phone" size={18} color="#922B3E" />
              <Text style={styles.contactText}>+91 9483357005</Text>
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Icon name="send" size={20} color="#FFF" />
                <Text style={styles.submitButtonText}>Submit Booking Request</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A3728',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8B7355',
    fontFamily: 'NotoSansKannada-Regular',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#8B7355',
    lineHeight: 18,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
  },
  sectionTitleKannada: {
    fontSize: 14,
    color: '#8B7355',
    fontFamily: 'NotoSansKannada-Regular',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#4A3728',
    borderWidth: 1,
    borderColor: '#F0E6D3',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#E74C3C',
  },
  errorText: {
    fontSize: 12,
    color: '#E74C3C',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#F0E6D3',
    gap: 10,
  },
  dateText: {
    fontSize: 15,
    color: '#4A3728',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: '#4A3728',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E6D3',
    marginTop: 8,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#8B7355',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFEF7',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6D3',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#922B3E',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default RoomBookingScreen;
