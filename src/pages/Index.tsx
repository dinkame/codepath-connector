// Redirect to hugim page
const Index = () => {
  // Redirect to the hugim HTML page
  window.location.replace('/hugim/');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">מעביר לעמוד החוגים...</h1>
        <p className="text-xl text-muted-foreground">
          אם הדף לא נטען אוטומטית, <a href="/hugim/" className="text-primary underline">לחץ כאן</a>
        </p>
      </div>
    </div>
  );
};

export default Index;
