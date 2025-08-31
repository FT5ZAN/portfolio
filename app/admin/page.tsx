
"use client";

import { useEffect, useState } from "react";
import { IKUpload, IKContext } from "imagekitio-react";

export default function AdminPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [type, setType] = useState<"realtime" | "hobby">("hobby");

  const [name, setSkill] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "expert" | "">("");
  const [skillImage, setSkillImage] = useState("");

  // Authentication endpoint
  const authenticator = async (): Promise<{
    signature: string;
    expire: number;
    token: string;
  }> => {
    try {
      const response = await fetch("/api/imagekit-auth");
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  };

  // Handle successful upload for projects
  const onProjectUploadSuccess = (res: any) => {
    setProjectImage(res.url);
    alert("✅ Project image uploaded successfully!");
  };

  // Handle successful upload for skills
  const onSkillUploadSuccess = (res: any) => {
    setSkillImage(res.url);
    alert("✅ Skill image uploaded successfully!");
  };

  // Handle upload errors
  const onError = (err: any) => {
    console.error("Image upload error:", err);
    alert("❌ Image upload failed: " + err.message);
  };

  // Light guard to avoid direct URL access
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("adminUnlocked")) {
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd want to use a more secure method
    if (pin === "4444") {
      setIsUnlocked(true);
      sessionStorage.setItem("adminUnlocked", "true");
    } else {
      alert("Wrong PIN");
      setPin("");
    }
  };

  async function addProject() {
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description, 
          image: projectImage || undefined,
          github: github || undefined,
          live: live || undefined,
          type
        }),
      });
      setTitle(""); 
      setDesc(""); 
      setProjectImage("");
      setGithub("");
      setLive("");
      setType("hobby");
      alert("✅ Project added");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("❌ Failed to add project");
    }
  }

  async function addSkill() {
    try {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          level: level || undefined, 
          image: skillImage || undefined 
        }),
      });
      setSkill(""); 
      setLevel(""); 
      setSkillImage("");
      alert("✅ Skill added");
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("❌ Failed to add skill");
    }
  }

  if (!isUnlocked) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        
      }}>
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px"
          }}
        >
          <h2 style={{ marginBottom: "1.5rem" }}>Admin Access</h2>
          <input
            type="password"  // Changed to password type to mask input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            style={{ 
              width: "100%", 
              padding: "0.75rem", 
              marginBottom: "1rem", 
              border: "1px solid #ccc", 
              borderRadius: "4px",
              fontSize: "1rem"
            }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: "0.75rem 1.5rem", 
              backgroundColor: "#0070f3", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto",color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin Dashboard</h1>
        <button 
          onClick={() => {
            setIsUnlocked(false);
            sessionStorage.removeItem("adminUnlocked");
          }}
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#ff4757", 
            color: "white", 
            border: "none", 
            borderRadius: 4 
          }}
        >
          Lock Dashboard
        </button>
      </div>

      {/* PROJECT FORM */}
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>Add Project</h2>
        <input 
          value={title} 
          onChange={(e)=>setTitle(e.target.value)} 
          placeholder="Title" 
          style={{ display: "block", marginBottom: 12, padding: 8, width: "100%", maxWidth: 400 }}
        />
        <textarea 
          value={description} 
          onChange={(e)=>setDesc(e.target.value)} 
          placeholder="Description" 
          style={{ display: "block", marginBottom: 12, padding: 8, width: "100%", maxWidth: 400, minHeight: 80 }}
        />
        
        {/* Project Type Selection */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Project Type:</label>
          <select 
            value={type} 
            onChange={(e)=>setType(e.target.value as "realtime" | "hobby")}
            style={{ display: "block", padding: 8, width: "100%", maxWidth: 400 }}
          >
            <option value="hobby">Hobby Project</option>
            <option value="realtime">Real-time Project</option>
          </select>
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <p>Upload Project Image:</p>
          <IKContext
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
            authenticator={authenticator}
          >
            <IKUpload
              fileName={`project-${Date.now()}`}
              onError={onError}
              onSuccess={onProjectUploadSuccess}
              style={{ display: "block", marginBottom: 8 }}
            />
          </IKContext>
          {projectImage && (
            <div style={{ marginTop: 8 }}>
              <p>Uploaded Image Preview:</p>
              <img src={projectImage} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
            </div>
          )}
        </div>
        
        <input 
          value={github} 
          onChange={(e)=>setGithub(e.target.value)} 
          placeholder="GitHub link" 
          style={{ display: "block", marginBottom: 12, padding: 8, width: "100%", maxWidth: 400 }}
        />
        <input 
          value={live} 
          onChange={(e)=>setLive(e.target.value)} 
          placeholder="Live demo link" 
          style={{ display: "block", marginBottom: 12, padding: 8, width: "100%", maxWidth: 400 }}
        />
        <button 
          onClick={addProject}
          style={{ padding: "8px 16px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 4 }}
        >
          Add Project
        </button>
      </section>

      {/* SKILL FORM */}
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
        <h2>Add Skill</h2>
        <input 
          value={name} 
          onChange={(e)=>setSkill(e.target.value)} 
          placeholder="Skill name" 
          style={{ display: "block", marginBottom: 12, padding: 8, width: "100%", maxWidth: 400 }}
        />
        <select 
          value={level} 
          onChange={(e)=>setLevel(e.target.value as any)}
          style={{ display: "block", marginBottom: 12, padding: 8, width: "100%", maxWidth: 400 }}
        >
          <option value="">(optional) Level</option>
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="expert">expert</option>
        </select>
        
        <div style={{ marginBottom: 12 }}>
          <p>Upload Skill Image:</p>
          <IKContext
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
            authenticator={authenticator}
          >
            <IKUpload
              fileName={`skill-${Date.now()}`}
              onError={onError}
              onSuccess={onSkillUploadSuccess}
              style={{ display: "block", marginBottom: 8 }}
            />
          </IKContext>
          {skillImage && (
            <div style={{ marginTop: 8 }}>
              <p>Uploaded Image Preview:</p>
              <img src={skillImage} alt="Preview" style={{ maxWidth: 200, maxHeight: 200 }} />
            </div>
          )}
        </div>
        
        <button 
          onClick={addSkill}
          style={{ padding: "8px 16px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 4 }}
        >
          Add Skill
        </button>
      </section>
    </main>
  );
}