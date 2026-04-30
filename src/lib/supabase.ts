import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lmkxusytbewccwgiilnb.supabase.co';
const supabaseAnonKey = 'sb_publishable_1DnIqAy2poZ5HmB7Vjrunw_-i19Ikuc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);