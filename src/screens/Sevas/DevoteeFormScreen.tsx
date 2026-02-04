import React, { useState, useEffect, useRef } from 'react';
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
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { Seva, DevoteeDetails } from '@/types/seva';
import { 
  rashiList, 
  nakshatraList, 
  gothraList, 
  indianStates,
  generateReferenceNumber,
  cancellationPolicy 
} from '@/data/sevaData';
// Import auth context for pre-filling
// import { useAuth } from '@/hooks/useAuth';

interface DevoteeFormScreenProps {
  route: {
    params: {
      sevas: Seva[];
      total: number;
      isParyaya?: boolean;
    };
  };
  navigation: any;
}

type PaymentMode = 'online' | 'upi' | 'bank_transfer';
type PrasadamCollection = 'personal' | 'post';

const DevoteeFormScreen = ({ route, navigation }: DevoteeFormScreenProps) => {
  const { sevas, total, isParyaya } = route.params;
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  
  // Dropdown modals
  const [showRashiPicker, setShowRashiPicker] = useState(false);
  const [showNakshatraPicker, setShowNakshatraPicker] = useState(false);
  const [showGothraPicker, setShowGothraPicker] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showPaymentPicker, setShowPaymentPicker] = useState(false);

  const [formData, setFormData] = useState<DevoteeDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rashi: '',
    nakshatra: '',
    gothra: '',
  });

  const [sevaDate, setSevaDate] = useState(new Date());
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('online');
  const [prasadamCollection, setPrasadamCollection] = useState<PrasadamCollection>('personal');
  const [postalAddress, setPostalAddress] = useState('');
  const [sameAsAddress, setSameAsAddress] = useState(true);
  const [consentChecked, setConsentChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill from user profile if logged in
  useEffect(() => {
    // const { user } = useAuth();
    // if (user) {
    //   setFormData(prev => ({
    //     ...prev,
    //     name: user.name || '',
    //     phone: user.phone || '',
    //     email: user.email || '',
    //     // ... other fields
    //   }));
    // }
  }, []);

  const updateField = (field: keyof DevoteeDetails, value: string) => {
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
    if (!formData.rashi) newErrors.rashi = 'Rashi is required';
    if (!formData.nakshatra) newErrors.nakshatra = 'Nakshatra is required';
    if (!formData.gothra) newErrors.gothra = 'Gothra is required';
    if (prasadamCollection === 'post' && !sameAsAddress && !postalAddress.trim()) {
      newErrors.postalAddress = 'Postal address is required';
    }
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

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    try {
      const referenceNumber = generateReferenceNumber(isParyaya ? 'PS' : 'SVS');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to payment screen or show success
      Alert.alert(
        'Booking Confirmed',
        `Your seva booking has been confirmed!\n\nReference: ${referenceNumber}\n\nTotal: ${formatPrice(total)}\n\nYou will receive a confirmation email at ${formData.email}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSevaDate(selectedDate);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#4A3728" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Devotee Details</Text>
        <Text style={styles.headerSubtitle}>ಸೇವಾಕರ್ತ ವಿವರಗಳು</Text>
      </View>
      <View style={styles.headerRight} />
    </View>
  );

  const renderInput = (
    label: string,
    field: keyof DevoteeDetails,
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
        value={formData[field]}
        onChangeText={(value) => updateField(field, value)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderDropdown = (
    label: string,
    value: string,
    placeholder: string,
    onPress: () => void,
    error?: string
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label} *</Text>
      <TouchableOpacity
        style={[styles.dropdown, error && styles.inputError]}
        onPress={onPress}
      >
        <Text style={value ? styles.dropdownText : styles.dropdownPlaceholder}>
          {value || placeholder}
        </Text>
        <Icon name="chevron-down" size={20} color="#8B7355" />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  const renderPickerModal = (
    visible: boolean,
    onClose: () => void,
    title: string,
    data: { id: string; name: string; nameKannada?: string }[],
    onSelect: (value: string) => void,
    selectedValue: string
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#4A3728" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalItem,
                  selectedValue === item.name && styles.modalItemSelected,
                ]}
                onPress={() => {
                  onSelect(item.name);
                  onClose();
                }}
              >
                <View>
                  <Text style={[
                    styles.modalItemText,
                    selectedValue === item.name && styles.modalItemTextSelected,
                  ]}>
                    {item.name}
                  </Text>
                  {item.nameKannada && (
                    <Text style={styles.modalItemSubtext}>{item.nameKannada}</Text>
                  )}
                </View>
                {selectedValue === item.name && (
                  <Icon name="check" size={20} color="#922B3E" />
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );

  const renderSevasSummary = () => (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Selected Sevas</Text>
      {sevas.map(seva => (
        <View key={seva.id} style={styles.sevaRow}>
          <Text style={styles.sevaName} numberOfLines={1}>{seva.nameKannada}</Text>
          <Text style={styles.sevaPrice}>{formatPrice(seva.price)}</Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>{formatPrice(total)}</Text>
      </View>
    </View>
  );

  const renderPolicyModal = () => (
    <Modal
      visible={showPolicyModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowPolicyModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, styles.policyModal]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{cancellationPolicy.title}</Text>
            <TouchableOpacity onPress={() => setShowPolicyModal(false)}>
              <Icon name="close" size={24} color="#4A3728" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cancellationPolicy.sections.map((section, index) => (
              <View key={index} style={styles.policySection}>
                <Text style={styles.policySectionTitle}>{section.heading}</Text>
                <Text style={styles.policySectionContent}>{section.content}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const paymentModes = [
    { id: 'online', name: 'Online Payment (Cards/NetBanking)' },
    { id: 'upi', name: 'UPI' },
    { id: 'bank_transfer', name: 'Bank Transfer' },
  ];

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
          {/* Seva Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seva Date</Text>
            <Text style={styles.sectionTitleKannada}>ಸೇವಾ ದಿನಾಂಕ</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date (dd/mm/yyyy) *</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Icon name="calendar" size={20} color="#D4AF37" />
                <Text style={styles.dateText}>{formatDate(sevaDate)}</Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={sevaDate}
                mode="date"
                minimumDate={new Date()}
                onChange={onDateChange}
              />
            )}
          </View>

          {/* Personal Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <Text style={styles.sectionTitleKannada}>ವೈಯಕ್ತಿಕ ವಿವರಗಳು</Text>

            {renderInput('Phone Number', 'phone', 'Enter 10-digit mobile number', 'phone-pad')}
            {renderInput('Devotee Name', 'name', 'Enter devotee name')}
            {renderInput('Email Address', 'email', 'Enter email address', 'email-address')}
          </View>

          {/* Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionTitleKannada}>ವಿಳಾಸ</Text>

            {renderInput('Address', 'address', 'Enter full address', 'default', true)}
            {renderInput('City', 'city', 'Enter city')}
            
            {renderDropdown(
              'State',
              formData.state,
              'Select State',
              () => setShowStatePicker(true),
              errors.state
            )}
            
            {renderInput('Pincode', 'pincode', 'Enter 6-digit pincode', 'number-pad')}
          </View>

          {/* Horoscope Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Horoscope Details</Text>
            <Text style={styles.sectionTitleKannada}>ಜಾತಕ ವಿವರಗಳು</Text>

            {renderDropdown(
              'Rashi (Zodiac)',
              formData.rashi,
              'Select Rashi',
              () => setShowRashiPicker(true),
              errors.rashi
            )}
            
            {renderDropdown(
              'Nakshatra (Star)',
              formData.nakshatra,
              'Select Nakshatra',
              () => setShowNakshatraPicker(true),
              errors.nakshatra
            )}
            
            {renderDropdown(
              'Gothra',
              formData.gothra,
              'Select Gothra',
              () => setShowGothraPicker(true),
              errors.gothra
            )}
          </View>

          {/* Payment Mode */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Mode</Text>
            <Text style={styles.sectionTitleKannada}>ಪಾವತಿ ವಿಧಾನ</Text>

            {renderDropdown(
              'Select Payment Mode',
              paymentModes.find(p => p.id === paymentMode)?.name || '',
              'Select Payment Mode',
              () => setShowPaymentPicker(true)
            )}
          </View>

          {/* Seva Summary */}
          {renderSevasSummary()}

          {/* Prasadam Collection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Collect Prasadam</Text>
            <Text style={styles.sectionTitleKannada}>ಪ್ರಸಾದ ಸಂಗ್ರಹ</Text>

            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setPrasadamCollection('personal')}
              >
                <View style={[styles.radio, prasadamCollection === 'personal' && styles.radioSelected]}>
                  {prasadamCollection === 'personal' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>By Personal Visit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setPrasadamCollection('post')}
              >
                <View style={[styles.radio, prasadamCollection === 'post' && styles.radioSelected]}>
                  {prasadamCollection === 'post' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>By Post</Text>
              </TouchableOpacity>
            </View>

            {prasadamCollection === 'post' && (
              <View style={styles.postalSection}>
                <Text style={styles.subLabel}>Postal Address</Text>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setSameAsAddress(!sameAsAddress)}
                >
                  <View style={[styles.smallCheckbox, sameAsAddress && styles.smallCheckboxChecked]}>
                    {sameAsAddress && <Icon name="check" size={14} color="#FFF" />}
                  </View>
                  <Text style={styles.checkboxLabel}>Same as above address</Text>
                </TouchableOpacity>
                
                {!sameAsAddress && (
                  <View style={styles.inputGroup}>
                    <TextInput
                      style={[styles.input, styles.multilineInput, errors.postalAddress && styles.inputError]}
                      placeholder="Enter postal address for prasadam delivery"
                      placeholderTextColor="#8B7355"
                      value={postalAddress}
                      onChangeText={setPostalAddress}
                      multiline
                      numberOfLines={3}
                    />
                    {errors.postalAddress && <Text style={styles.errorText}>{errors.postalAddress}</Text>}
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Consent */}
          <TouchableOpacity
            style={styles.consentContainer}
            onPress={() => setConsentChecked(!consentChecked)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, consentChecked && styles.checkboxChecked]}>
              {consentChecked && <Icon name="check" size={16} color="#FFF" />}
            </View>
            <Text style={styles.consentText}>
              I have read and agree to the{' '}
              <Text style={styles.linkText} onPress={() => setShowPolicyModal(true)}>
                Cancellation & Refund Policy
              </Text>
            </Text>
          </TouchableOpacity>
          {errors.consent && <Text style={styles.errorText}>{errors.consent}</Text>}
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <View style={styles.footerTotal}>
            <Text style={styles.footerLabel}>Total</Text>
            <Text style={styles.footerAmount}>{formatPrice(total)}</Text>
          </View>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>Proceed to Pay</Text>
                <Icon name="arrow-right" size={20} color="#FFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Picker Modals */}
      {renderPickerModal(
        showRashiPicker,
        () => setShowRashiPicker(false),
        'Select Rashi',
        rashiList,
        (value) => updateField('rashi', value),
        formData.rashi
      )}
      
      {renderPickerModal(
        showNakshatraPicker,
        () => setShowNakshatraPicker(false),
        'Select Nakshatra',
        nakshatraList,
        (value) => updateField('nakshatra', value),
        formData.nakshatra
      )}
      
      {renderPickerModal(
        showGothraPicker,
        () => setShowGothraPicker(false),
        'Select Gothra',
        gothraList,
        (value) => updateField('gothra', value),
        formData.gothra
      )}
      
      {renderPickerModal(
        showStatePicker,
        () => setShowStatePicker(false),
        'Select State',
        indianStates.map(state => ({ id: state, name: state })),
        (value) => updateField('state', value),
        formData.state
      )}
      
      {renderPickerModal(
        showPaymentPicker,
        () => setShowPaymentPicker(false),
        'Select Payment Mode',
        paymentModes,
        (value) => setPaymentMode(paymentModes.find(p => p.name === value)?.id as PaymentMode || 'online'),
        paymentModes.find(p => p.id === paymentMode)?.name || ''
      )}

      {renderPolicyModal()}
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
    paddingBottom: 120,
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
  subLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 8,
    marginTop: 12,
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#F0E6D3',
  },
  dropdownText: {
    fontSize: 15,
    color: '#4A3728',
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: '#8B7355',
  },
  summaryCard: {
    backgroundColor: '#FFF9E8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A3728',
    marginBottom: 12,
  },
  sevaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  sevaName: {
    flex: 1,
    fontSize: 14,
    color: '#4A3728',
    fontFamily: 'NotoSansKannada-Regular',
  },
  sevaPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#922B3E',
    marginLeft: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#922B3E',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#922B3E',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#922B3E',
  },
  radioLabel: {
    fontSize: 15,
    color: '#4A3728',
  },
  postalSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6D3',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  smallCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCheckboxChecked: {
    backgroundColor: '#922B3E',
    borderColor: '#922B3E',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4A3728',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
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
    fontSize: 14,
    color: '#4A3728',
    lineHeight: 22,
  },
  linkText: {
    color: '#922B3E',
    fontWeight: '600',
    textDecorationLine: 'underline',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerTotal: {},
  footerLabel: {
    fontSize: 12,
    color: '#8B7355',
  },
  footerAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#922B3E',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#922B3E',
    paddingHorizontal: 24,
    paddingVertical: 14,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFEF7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 24,
  },
  policyModal: {
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  modalItemSelected: {
    backgroundColor: '#FFF9E8',
  },
  modalItemText: {
    fontSize: 15,
    color: '#4A3728',
  },
  modalItemTextSelected: {
    fontWeight: '600',
    color: '#922B3E',
  },
  modalItemSubtext: {
    fontSize: 13,
    color: '#8B7355',
    marginTop: 2,
    fontFamily: 'NotoSansKannada-Regular',
  },
  policySection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D3',
  },
  policySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A3728',
    marginBottom: 8,
  },
  policySectionContent: {
    fontSize: 14,
    color: '#8B7355',
    lineHeight: 22,
  },
});

export default DevoteeFormScreen;
