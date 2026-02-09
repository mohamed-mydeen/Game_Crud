"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto"
  },
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    gap: "16px"
  },
  header: { flex: 1 },
  title: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#080808"
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.8)"
  },
  logoutButton: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    backgroundColor: "#ffffff",
    color: "#667eea",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  inputSection: {
    backgroundColor: "#c097c1",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "30px",
    color: "#080808"
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px"
  },
  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #080808",
    color: "#080808",
    fontSize: "15px",
    outline: "none"
  },
  addButton: {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "#667eea",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.2s",
    minWidth: "100px",
    position: "relative" as const
  },
  
  imageUploadWrapper: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color: "#080808"
  },
  uploadButton: {
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s"
  },
  hiddenFileInput: {
    display: "none"
  },
  imagePreview: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    objectFit: "cover" as const,
    border: "2px solid #080808"
  },
  removeImageButton: {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12px"
  },
  gamesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  },
  gameCard: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    border: "4px solid #020918"
  },
  gameImage: {
    width: "100%",
    height: "180px",
    borderRadius: "12px",
    objectFit: "cover" as const,
    marginBottom: "12px"
  },
  gameIcon: {
    height: "180px",
    borderRadius: "12px",
    background: "#667eea",
    color: "#fff",
    fontSize: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px"
  },
  gameName: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#080808"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px"
  },
  editButton: {
    flex: 1,
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s"
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s"
  },
  
  loadingOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  loadingSpinner: {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    textAlign: "center" as const
  },
  spinnerIcon: {
    width: "50px",
    height: "50px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px"
  },
  loadingText: {
    fontSize: "16px",
    color: "#333",
    fontWeight: "600"
  },
  
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "90%"
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "12px"
  },
  modalMessage: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "24px",
    lineHeight: "1.5"
  },
  modalButtons: {
    display: "flex",
    gap: "12px"
  },
  modalCancelButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },
  modalConfirmButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },
  
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.5
  },
  emptyText: {
    fontSize: "18px",
    color: "#6b7280",
    fontWeight: "500"
  }
};

// Add keyframe animation for spinner
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default function Dashboard() {
  const [games, setGames] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  
  // NEW: Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // NEW: Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'delete' | 'logout';
    data?: any;
  } | null>(null);

  const router = useRouter();
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!token) {
      router.push("/");
      return;
    }

    setUserEmail(email || "");
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setIsLoading(true);
    setLoadingMessage("Loading games...");
    
    try {
      const res = await fetch(`${API_URL}/games`);
      const data = await res.json();
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  
  const handleUploadClick = () => {
    const input = document.getElementById('file-upload') as HTMLInputElement;
    input?.click();
  };

  const addOrUpdateGame = async () => {
    if (!name.trim()) {
      alert("Please enter a game name");
      return;
    }

    setIsLoading(true);
    setLoadingMessage(editId ? "Updating game..." : "Adding game...");

    try {
      if (editId) {
        await fetch(`${API_URL}/games/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image: selectedImage })
        });
      } else {
        await fetch(`${API_URL}/games`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image: selectedImage })
        });
      }

      setName("");
      setSelectedImage(null);
      setEditId(null);
      await fetchGames();
    } catch (error) {
      console.error("Error saving game:", error);
      alert("Failed to save game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  
  const showDeleteConfirmation = (game: any) => {
    setConfirmAction({ type: 'delete', data: game });
    setShowConfirmModal(true);
  };

  
  const deleteGame = async (id: number) => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setLoadingMessage("Deleting game...");

    try {
      await fetch(`${API_URL}/games/${id}`, { method: "DELETE" });
      await fetchGames();
    } catch (error) {
      console.error("Error deleting game:", error);
      alert("Failed to delete game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const editGame = (game: any) => {
    setName(game.name);
    setEditId(game.id);
    setSelectedImage(game.image);
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  const showLogoutConfirmation = () => {
    setConfirmAction({ type: 'logout' });
    setShowConfirmModal(true);
  };

  
  const handleLogout = () => {
    setShowConfirmModal(false);
    localStorage.clear();
    router.push("/");
  };

  
  const handleConfirm = () => {
    if (confirmAction?.type === 'delete') {
      deleteGame(confirmAction.data.id);
    } else if (confirmAction?.type === 'logout') {
      handleLogout();
    }
  };

  
  const handleCancel = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.headerWrapper}>
          <div>
            <h1 style={styles.title}>🎮 Game Dashboard</h1>
            <p style={styles.subtitle}>Welcome, {userEmail}</p>
          </div>
          <button 
            style={styles.logoutButton} 
            onClick={showLogoutConfirmation}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
             Logout
          </button>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.inputWrapper}>
            <input
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter game name"
              onKeyPress={(e) => e.key === 'Enter' && addOrUpdateGame()}
            />
            <button 
              style={styles.addButton} 
              onClick={addOrUpdateGame}
              disabled={isLoading}
            >
              {editId ? "✓ Update" : "+ Add"}
            </button>
          </div>

          {/* NEW: Custom file upload UI */}
          <div style={styles.imageUploadWrapper}>
            <input 
              id="file-upload"
              type="file" 
              accept="image/*"
              onChange={handleImageChange} 
              style={styles.hiddenFileInput}
            />
            <button 
              style={styles.uploadButton}
              onClick={handleUploadClick}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#5568d3"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#667eea"}
            >
               Choose Image
            </button>
            
            {selectedImage && (
              <>
                <img src={selectedImage} style={styles.imagePreview} alt="Preview" />
                <button 
                  style={styles.removeImageButton} 
                  onClick={() => setSelectedImage(null)}
                >
                  ✕ Remove
                </button>
              </>
            )}
          </div>
        </div>

        {games.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}></div>
            <p style={styles.emptyText}>
              {isLoading ? "Loading..." : "No games yet. Add your first game above!"}
            </p>
          </div>
        ) : (
          <div style={styles.gamesGrid}>
            {games.map((game) => (
              <div key={game.id} style={styles.gameCard}>
                {game.image ? (
                  <img src={game.image} style={styles.gameImage} alt={game.name} />
                ) : (
                  <div style={styles.gameIcon}>🎮</div>
                )}
                <h3 style={styles.gameName}>{game.name}</h3>
                <div style={styles.buttonGroup}>
                  <button 
                    style={styles.editButton} 
                    onClick={() => editGame(game)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
                  >
                     Edit
                  </button>
                  <button 
                    style={styles.deleteButton} 
                    onClick={() => showDeleteConfirmation(game)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
                  >
                     Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NEW: Loading Overlay */}
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingSpinner}>
            <div style={styles.spinnerIcon}></div>
            <p style={styles.loadingText}>{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* NEW: Confirmation Modal */}
      {showConfirmModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2 style={styles.modalTitle}>
              {confirmAction?.type === 'delete' ? ' Delete Game?' : ' Logout?'}
            </h2>
            <p style={styles.modalMessage}>
              {confirmAction?.type === 'delete' 
                ? `Are you sure you want to delete "${confirmAction.data?.name}"? This action cannot be undone.`
                : 'Are you sure you want to logout? You will need to login again to access the dashboard.'}
            </p>
            <div style={styles.modalButtons}>
              <button 
                style={styles.modalCancelButton} 
                onClick={handleCancel}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#d1d5db"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e5e7eb"}
              >
                Cancel
              </button>
              <button 
                style={styles.modalConfirmButton} 
                onClick={handleConfirm}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
              >
                {confirmAction?.type === 'delete' ? 'Delete' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

