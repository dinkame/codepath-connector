import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Use service role key to bypass RLS for seeding
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    console.log('Starting to seed classes data...');
    // Idempotency: skip if table already has rows
    const { count, error: countError } = await supabaseClient
      .from('classes')
      .select('*', { count: 'exact', head: true });
    if (countError) {
      console.error('Error counting classes:', countError);
      // Continue; we will try to seed anyway
    }
    if ((count ?? 0) > 0) {
      console.log(`Seed skipped: classes already contain ${count} rows`);
      return new Response(
        JSON.stringify({ success: true, message: `Already seeded (${count} rows)` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
      );
    }

    // The activities data from the HTML file
    const activities = [
      // --- מרכז קהילתי הדר אפקה ---
      { name: "התעמלות התפתחותית", instructor: "נטליה רנדלר", day: "שני", age: "עם הורה 2.5-3.5", time: "16:30-17:15", location: "סטודיו G", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "התעמלות התפתחותית", instructor: "נטליה רנדלר", day: "שני", age: "3.5-4.5", time: "17:15-18:00", location: "סטודיו G", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "התעמלות התפתחותית", instructor: "נטליה רנדלר", day: "שני", age: "4.5-6", time: "18:00-18:45", location: "סטודיו G", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "יוגה בשילוב אנגלית", instructor: "לי סומך", day: "רביעי", age: "2-4", time: "16:45-17:30", location: "סטודיו כניסה", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "טרום כלי", instructor: "אורי תלמי", day: "חמישי", age: "טר\"ח", time: "16:30-17:00", location: "לוגי", center: "מרכז קהילתי הדר אפקה", category: "העשרה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "טרום כלי", instructor: "אורי תלמי", day: "חמישי", age: "טרום חובה+חובה", time: "17:00-17:45", location: "לוגי", center: "מרכז קהילתי הדר אפקה", category: "העשרה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "ג'ודו", instructor: "רביב אהרון", day: "שני", age: "טט\"ר+טרום חובה", time: "17:15-18:00", location: "סטודיו אמנויות לחימה", center: "מרכז קהילתי הדר אפקה", category: "אומנות לחימה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "ג'ודו", instructor: "רביב אהרון", day: "שני", age: "גן חובה-כיתות ב'", time: "18:00-18:45", location: "סטודיו אמנויות לחימה", center: "מרכז קהילתי הדר אפקה", category: "אומנות לחימה", ageTags: ["גן", "יסודי נמוך"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "כדורסל", instructor: "יהלי ברזילי", day: "ראשון", age: "גן חובה", time: "16:30-17:15", location: "אולם ספורט", center: "מרכז קהילתי הדר אפקה", category: "ספורט", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "צעדים ראשונים בבלט", instructor: "שלומית קורי", day: "שלישי", age: "טר\"ח", time: "16:30-17:10", location: "סטודיו G", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "בלט ומחול יצירתי", instructor: "שלומית קורי", day: "שלישי", age: "טרום חובה", time: "17:10-17:50", location: "סטודיו G", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "בלט ומחול יצירתי", instructor: "שלומית קורי", day: "שלישי", age: "חובה+כיתות א'", time: "17:50-18:35", location: "סטודיו G", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["גן", "יסודי נמוך"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "ג'ודו", instructor: "רביב אהרון", day: "שני", age: "כיתות ג' ומעלה", time: "16:30-17:15", location: "סטודיו אמנויות לחימה", center: "מרכז קהילתי הדר אפקה", category: "אומנות לחימה", ageTags: ["יסודי נמוך", "יסודי גבוה", "חטיבה"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "ערסלים", instructor: "אפרת אהרון", day: "שלישי", age: "כיתות א'-ג'", time: "16:15-17:00", location: "סטודיו אמנויות לחימה", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["יסודי נמוך"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "ערסלים", instructor: "אפרת אהרון", day: "שלישי", age: "כיתות ג'-ד'", time: "17:00-17:45", location: "סטודיו אמנויות לחימה", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["יסודי נמוך", "יסודי גבוה"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      { name: "ערסלים", instructor: "אפרת אהרון", day: "שלישי", age: "כיתות ה'-ו'", time: "17:45-18:30", location: "סטודיו אמנויות לחימה", center: "מרכז קהילתי הדר אפקה", category: "מחול ותנועה", ageTags: ["יסודי גבוה"], type: "community", contact: { phone: "073-3844015", person: "אוריין קניגסבוך" } },
      // Add more activities here...
      { name: "סדנאות מלאכות יד", instructor: "חגית", day: "משתנה", age: "מבוגרים", time: "משתנה", location: "הדר יוסף", center: "סטודיו בדינה", category: "סדנאות", ageTags: ["מבוגרים"], type: "private", contact: { phone: "0524440251", person: "חגית" } }
    ];

    // Convert day names to numbers
    const dayMap: Record<string, number> = {
      'ראשון': 1,
      'שני': 2,
      'שלישי': 3,
      'רביעי': 4,
      'חמישי': 5,
      'שישי': 6,
      'שבת': 7
    };

    // Parse age ranges
    const parseAge = (ageStr: string) => {
      // Try to extract numbers from age string
      const matches = ageStr.match(/(\d+)/g);
      if (matches) {
        const ages = matches.map(m => parseInt(m));
        return { min: Math.min(...ages), max: Math.max(...ages) };
      }
      
      // Default age ranges for common terms
      if (ageStr.includes('גן') || ageStr.includes('טר') || ageStr.includes('חובה')) {
        return { min: 3, max: 6 };
      }
      if (ageStr.includes('יסודי') || ageStr.includes('כיתות')) {
        return { min: 6, max: 12 };
      }
      if (ageStr.includes('נוער') || ageStr.includes('חטיבה')) {
        return { min: 12, max: 18 };
      }
      if (ageStr.includes('מבוגר')) {
        return { min: 18, max: 99 };
      }
      
      return { min: null, max: null };
    };

    // Parse time to get start and end times
    const parseTime = (timeStr: string) => {
      const parts = timeStr.split('-');
      if (parts.length === 2) {
        return { start: parts[0].trim(), end: parts[1].trim() };
      }
      return { start: null, end: null };
    };

    // Get neighborhood from center mapping
    const neighborhoodMap: Record<string, string> = {
      "בית ספר מגן": "מעוז אביב",
      "חוג עצמאי - מעוז אביב": "מעוז אביב",
      "מורים פרטיים": "מעוז אביב",
      "הסדנאות של מורי": "מעוז אביב",
      "בית פרנקפורט": "הדר יוסף/נאות אפקה",
      "המרכז האולימפי": "הדר יוסף/נאות אפקה",
      "מרכז קהילתי הדר אפקה": "הדר יוסף/נאות אפקה",
      "קאנטרי נאות אפקה": "הדר יוסף/נאות אפקה",
      "בית ספר גיל": "הדר יוסף/נאות אפקה",
      "בית ספר דוד ילין": "הדר יוסף/נאות אפקה",
      "Craftoola": "הדר יוסף/נאות אפקה",
      "Creata": "הדר יוסף/נאות אפקה",
      "סטודיו לא מושלם": "הדר יוסף/נאות אפקה",
      "סטודיו סומו": "הדר יוסף/נאות אפקה",
      "סטודיו בדינה": "הדר יוסף/נאות אפקה",
      "מרכז ספורט והעשרה נעמי שמר": "תל ברוך צפון"
    };

    // Convert activities to database format
    const classesToInsert = activities.map(activity => {
      const ageRange = parseAge(activity.age);
      const timeRange = parseTime(activity.time);
      const day = dayMap[activity.day] || null;
      
      return {
        name: activity.name,
        description: activity.description || null,
        instructor: activity.instructor || null,
        location: activity.location || null,
        day_of_week: day,
        start_time: timeRange.start || null,
        end_time: timeRange.end || null,
        age_min: ageRange.min,
        age_max: ageRange.max,
        capacity: null,
        price: null,
        tags: activity.ageTags || [],
        metadata: {
          center: activity.center,
          category: activity.category,
          type: activity.type,
          neighborhood: neighborhoodMap[activity.center] || null,
          contact: activity.contact,
          originalAge: activity.age,
          originalDay: activity.day,
          originalTime: activity.time
        }
      };
    });

    console.log(`Attempting to insert ${classesToInsert.length} classes...`);

    // Insert data in batches
    const batchSize = 50;
    let totalInserted = 0;
    
    for (let i = 0; i < classesToInsert.length; i += batchSize) {
      const batch = classesToInsert.slice(i, i + batchSize);
      
      const { data, error } = await supabaseClient
        .from('classes')
        .insert(batch);

      if (error) {
        console.error('Error inserting batch:', error);
        throw error;
      }

      totalInserted += batch.length;
      console.log(`Inserted batch: ${batch.length} classes (total: ${totalInserted})`);
    }

    console.log('Successfully seeded classes table!');

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully inserted ${totalInserted} classes`,
        totalInserted
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error seeding classes:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})