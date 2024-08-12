using System.Text.Json;
using System.IO;

namespace WebApplication1.Models
{
    public class EscribirJson
    {
        private readonly string _filePath;

        public EscribirJson()
        {
            // Define la ruta del archivo JSON
            _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "pacientes.json");
        }

        public void GuardarPaciente(Paciente paciente)
        {
            // Verificar si el directorio existe, si no, crear
            var directory = Path.GetDirectoryName(_filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            // Leer el archivo JSON existente, si existe
            var pacientes = new List<Paciente>();
            if (File.Exists(_filePath))
            {
                var json = File.ReadAllText(_filePath);
                pacientes = JsonSerializer.Deserialize<List<Paciente>>(json) ?? new List<Paciente>();
            }

            // Agregar el nuevo paciente
            pacientes.Add(paciente);

            // Escribir el archivo JSON actualizado
            var updatedJson = JsonSerializer.Serialize(pacientes, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, updatedJson);
        }
        // Funcion auxiliar para leer el archivo JSON
        public List<Paciente> LeerPacientes()
        {
            if (!File.Exists(_filePath))
            {
                return new List<Paciente>();
            }

            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<Paciente>>(json) ?? new List<Paciente>();
        }
    }
}
